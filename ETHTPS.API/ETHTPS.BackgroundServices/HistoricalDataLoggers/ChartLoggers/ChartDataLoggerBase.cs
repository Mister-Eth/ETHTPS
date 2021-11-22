using ETHTPS.Data.Database;
using ETHTPS.Data.Models;

using Microsoft.EntityFrameworkCore;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.HistoricalDataLoggers.ChartLoggers
{
    /// <summary>
    /// Represents am abstract chart data logger.
    /// </summary>
    public abstract class ChartDataLoggerBase<TTargetHistoricalData> : HistoricalDataLoggerBase, IHistoricalDataLogger
        where TTargetHistoricalData : TimedTPSAndGasData, new()
    {
        private readonly Func<ETHTPSContext, DbSet<TTargetHistoricalData>> _dataSelector;
        private readonly Func<DateTime, DateTime> _targetDateGenerator;
        private readonly Func<TTargetHistoricalData, DateTime, bool> _updateEntryIf;
        private readonly Func<TTargetHistoricalData, DateTime, bool> _targetEntryPartialSelector;

        protected ChartDataLoggerBase(ETHTPSContext context, Func<ETHTPSContext, DbSet<TTargetHistoricalData>> dataSelector, Func<DateTime, DateTime> targetDateGenerator, Func<TTargetHistoricalData, DateTime, bool> targetEntryPartialSelector, Func<TTargetHistoricalData, DateTime, bool> updateEntryIf, string network) : base(context, network)
        {
            _dataSelector = dataSelector;
            _targetDateGenerator = targetDateGenerator;
            _targetEntryPartialSelector = targetEntryPartialSelector;
            _updateEntryIf = updateEntryIf;
        }

        public void AddOrUpdateEntry(TPSGPSInfo entry, int providerID)
        {
            var dbSet = _dataSelector(_context);
            var targetDate = _targetDateGenerator(entry.Date.ToUniversalTime());
            Func<TTargetHistoricalData, bool> targetEntrySelector = x => _targetEntryPartialSelector(x, targetDate) && x.Network == _networkID && x.Provider == providerID;
            void addNewEntry()
            {
                dbSet.Add(new TTargetHistoricalData()
                {
                    Network = _networkID,
                    AverageTps = entry.TPS,
                    AverageGps = entry.GPS,
                    Provider = providerID,
                    StartDate = targetDate,
                    ReadingsCount = 1,
                    OclhJson = JsonConvert.SerializeObject(new TPSGPSOCLH(entry.TPS, entry.GPS)
                    {
                        Date = targetDate
                    })
                });
            };
            if (!dbSet.Any(targetEntrySelector))
            {
                addNewEntry();
            }
            else
            {
                var x = dbSet.First(targetEntrySelector);
                if (_updateEntryIf(x, entry.Date))
                {
                    x.AverageTps = ((x.AverageTps * x.ReadingsCount) + entry.TPS) / (x.ReadingsCount + 1);
                    x.AverageGps = ((x.AverageGps * x.ReadingsCount) + entry.GPS) / (x.ReadingsCount + 1);
                    x.ReadingsCount++;

                    if (!string.IsNullOrWhiteSpace(x.OclhJson))
                    {
                        var oclh = JsonConvert.DeserializeObject<TPSGPSOCLH>(x.OclhJson);
                        oclh.GPS.Close = entry.GPS;
                        oclh.TPS.Close = entry.TPS;
                        if (oclh.TPS.High < entry.TPS)
                        {
                            oclh.TPS.High = entry.TPS;
                        }
                        if (oclh.TPS.Low > entry.TPS)
                        {
                            oclh.TPS.Low = entry.TPS;
                        }

                        if (oclh.GPS.High < entry.GPS)
                        {
                            oclh.GPS.High = entry.GPS;
                        }
                        if (oclh.GPS.Low > entry.GPS)
                        {
                            oclh.GPS.Low = entry.GPS;
                        }

                        x.OclhJson = JsonConvert.SerializeObject(oclh);
                    }
                    else
                    {
                        x.OclhJson = JsonConvert.SerializeObject(new TPSGPSOCLH(x.AverageTps, x.AverageGps));
                    }
                }
                else
                {
                    addNewEntry();
                }

                dbSet.Update(x);
            }
        }
    }
}
