using ETHTPS.Data.Database;

using Microsoft.EntityFrameworkCore;

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
            var targetDate = _targetDateGenerator(entry.Date);
            Func<TTargetHistoricalData, bool> targetEntrySelector = x => _targetEntryPartialSelector(x, targetDate) && x.Network == _networkID && x.Provider == providerID;
            if (!dbSet.Any(targetEntrySelector))
            {
                dbSet.Add(new TTargetHistoricalData()
                {
                    Network = _networkID,
                    AverageTps = entry.TPS,
                    AverageGps = entry.GPS,
                    Provider = providerID,
                    StartDate = targetDate,
                    ReadingsCount = 1
                });
            }
            else
            {
                var x = dbSet.First(targetEntrySelector);
                if (_updateEntryIf(x, entry.Date))
                {
                    x.AverageTps = ((x.AverageTps * x.ReadingsCount) + entry.TPS) / (x.ReadingsCount + 1);
                    x.AverageGps = ((x.AverageGps * x.ReadingsCount) + entry.GPS) / (x.ReadingsCount + 1);
                    x.ReadingsCount++;
                }
                else
                {
                    x.AverageTps = entry.TPS;
                    x.AverageGps = entry.GPS;
                    x.ReadingsCount = 1;
                    x.StartDate = targetDate;
                }
                dbSet.Update(x);
            }
        }
    }
}
