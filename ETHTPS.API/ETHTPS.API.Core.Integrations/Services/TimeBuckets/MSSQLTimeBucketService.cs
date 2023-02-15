using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.TimeBuckets;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Integrations.MSSQL.Extensions;
using ETHTPS.Data.Core.Models.DataEntries.BlockchainServices.Models;
using ETHTPS.Services.BlockchainServices.Extensions;

using Microsoft.Extensions.Logging;

namespace ETHTPS.API.Core.Integrations.MSSQL.Services.TimeBuckets
{
    public class MSSQLTimeBucketService<T> : ITimeBucketDataUpdaterService<T>
         where T : IBlockInfoProvider
    {
        private readonly EthtpsContext _context;
        private readonly int _mainnetID;
        private readonly int _providerID;
        private readonly string _provider;
        private readonly ILogger<MSSQLTimeBucketService<T>> _logger;

        public MSSQLTimeBucketService(T instance, EthtpsContext context, ILogger<MSSQLTimeBucketService<T>> logger)
        {
            _context = context;
            _mainnetID = _context.GetMainnetID();
            _providerID = _context.GetProviderID(instance.GetProviderName());
            _provider = instance.GetProviderName();
            _logger = logger;
        }

        public void UpdateLatestEntries(TPSGPSInfo entry)
        {
            Func<TpsandGasDataLatest, bool> selector = x => x.NetworkNavigation.Id == _mainnetID && x.ProviderNavigation.Name == _provider;
            if (!_context.TpsandGasDataLatests.Any(selector))
            {
                _context.TpsandGasDataLatests.Add(new TpsandGasDataLatest()
                {
                    Gps = entry.GPS,
                    Tps = entry.TPS,
                    Network = _mainnetID,
                    Provider = _providerID
                });
            }
            else
            {
                TpsandGasDataLatest x = _context.TpsandGasDataLatests.First(selector);
                x.Tps = entry.TPS;
                x.Gps = entry.GPS;
                _context.TpsandGasDataLatests.Update(x);
            }
        }

        public void UpdateMaxEntry(TPSGPSInfo entry)
        {
            Func<TpsandGasDataMax, bool> selector = x => x.ProviderNavigation.Name == _provider && x.NetworkNavigation.Id == _mainnetID;
            if (!_context.TpsandGasDataMaxes.Any(selector))
            {
                _context.TpsandGasDataMaxes.Add(new TpsandGasDataMax()
                {
                    Date = entry.Date,
                    MaxGps = entry.GPS,
                    MaxTps = entry.TPS,
                    MaxTpsblockNumber = entry.BlockNumber,
                    MaxGpsblockNumber = entry.BlockNumber,
                    Network = _mainnetID,
                    Provider = _providerID
                });
            }
            else
            {
                TpsandGasDataMax targetEntry = _context.TpsandGasDataMaxes.First(selector);
                if (entry.TPS > targetEntry.MaxTps)
                {
                    targetEntry.MaxTps = entry.TPS;
                    targetEntry.MaxTpsblockNumber = entry.BlockNumber;
                }
                if (entry.GPS > targetEntry.MaxGps)
                {
                    targetEntry.MaxGps = entry.GPS;
                    targetEntry.MaxGpsblockNumber = entry.BlockNumber;
                }
                _context.TpsandGasDataMaxes.Update(targetEntry);
            }
        }

        public void AddOrUpdateMinuteTPSEntry(TPSGPSInfo entry)
        {
            if (DateTime.Now.Subtract(entry.Date).TotalSeconds > 60) return;

            DateTime targetDate = entry.Date
                .Subtract(TimeSpan.FromMilliseconds(entry.Date.Millisecond));
            Func<TpsandGasDataMinute, bool> selector = x => x.NetworkNavigation.Id == _mainnetID && x.Provider == _providerID && x.StartDate.Second == targetDate.Second;
            if (!_context.TpsandGasDataMinutes.Any(selector))
            {
                _context.TpsandGasDataMinutes.Add(new TpsandGasDataMinute()
                {
                    Network = _mainnetID,
                    AverageTps = entry.TPS,
                    AverageGps = entry.GPS,
                    Provider = _providerID,
                    StartDate = targetDate,
                    ReadingsCount = 1
                });
            }
            else
            {
                TpsandGasDataMinute x = _context.TpsandGasDataMinutes.First(selector);
                if (x.StartDate.Second == targetDate.Second && x.StartDate.Minute == targetDate.Minute)
                {
                    x.AverageTps = ((x.AverageTps * x.ReadingsCount) + entry.TPS) / ++x.ReadingsCount;
                    x.AverageGps = ((x.AverageGps * x.ReadingsCount) + entry.GPS) / ++x.ReadingsCount;
                }
                else
                {
                    x.AverageTps = entry.TPS;
                    x.AverageGps = entry.GPS;
                    x.ReadingsCount = 1;
                    x.StartDate = entry.Date;
                }
                _context.TpsandGasDataMinutes.Update(x);
            }
        }

        public void AddOrUpdateHourTPSEntry(TPSGPSInfo entry)
        {
            if (DateTime.Now.Subtract(entry.Date).TotalMinutes > 60) return;

            DateTime targetDate = entry.Date
                .Subtract(TimeSpan.FromSeconds(entry.Date.Second))
                .Subtract(TimeSpan.FromMilliseconds(entry.Date.Millisecond));
            Func<TpsandGasDataHour, bool> selector = x => x.NetworkNavigation.Id == _mainnetID && x.Provider == _providerID && x.StartDate.Minute == targetDate.Minute;
            if (!_context.TpsandGasDataHours.Any(selector))
            {
                _context.TpsandGasDataHours.Add(new TpsandGasDataHour()
                {
                    Network = _mainnetID,
                    AverageTps = entry.TPS,
                    AverageGps = entry.GPS,
                    Provider = _providerID,
                    StartDate = targetDate,
                    ReadingsCount = 1
                });
            }
            else
            {
                TpsandGasDataHour x = _context.TpsandGasDataHours.First(selector);
                if (x.StartDate.Hour == targetDate.Hour)
                {
                    x.AverageTps = ((x.AverageTps * x.ReadingsCount) + entry.TPS) / ++x.ReadingsCount;
                    x.AverageGps = ((x.AverageGps * x.ReadingsCount) + entry.GPS) / ++x.ReadingsCount;
                }
                else
                {
                    x.AverageTps = entry.TPS;
                    x.AverageGps = entry.GPS;
                    x.ReadingsCount = 1;
                    x.StartDate = entry.Date;
                }
                _context.TpsandGasDataHours.Update(x);
            }
        }
        public void AddOrUpdateDayTPSEntry(TPSGPSInfo entry)
        {
            if (DateTime.Now.Subtract(entry.Date).TotalHours > 24) return;

            DateTime targetDate = entry.Date
                .Subtract(TimeSpan.FromSeconds(entry.Date.Second))
                .Subtract(TimeSpan.FromMilliseconds(entry.Date.Millisecond))
                .Subtract(TimeSpan.FromMinutes(entry.Date.Minute));
            Func<TpsandGasDataDay, bool> selector = x => x.NetworkNavigation.Id == _mainnetID && x.Provider == _providerID && x.StartDate.Hour == targetDate.Hour;
            if (!_context.TpsandGasDataDays.Any(selector))
            {
                _context.TpsandGasDataDays.Add(new TpsandGasDataDay()
                {
                    Network = _mainnetID,
                    AverageTps = entry.TPS,
                    AverageGps = entry.GPS,
                    Provider = _providerID,
                    StartDate = targetDate,
                    ReadingsCount = 1
                });
            }
            else
            {
                TpsandGasDataDay x = _context.TpsandGasDataDays.First(selector);
                if (x.StartDate.Day == targetDate.Day)
                {
                    x.AverageTps = ((x.AverageTps * x.ReadingsCount) + entry.TPS) / ++x.ReadingsCount;
                    x.AverageGps = ((x.AverageGps * x.ReadingsCount) + entry.GPS) / ++x.ReadingsCount;
                }
                else
                {
                    x.AverageTps = entry.TPS;
                    x.AverageGps = entry.GPS;
                    x.ReadingsCount = 1;
                    x.StartDate = entry.Date;
                }
                _context.TpsandGasDataDays.Update(x);
            }
        }
        public void AddOrUpdateWeekTPSEntry(TPSGPSInfo entry)
        {
            if (DateTime.Now.Subtract(entry.Date).TotalDays > 7) return;

            DateTime targetDate = entry.Date
            .Subtract(TimeSpan.FromSeconds(entry.Date.Second))
            .Subtract(TimeSpan.FromMilliseconds(entry.Date.Millisecond))
            .Subtract(TimeSpan.FromMinutes(entry.Date.Minute));
            Func<TpsandGasDataWeek, bool> selector = x => x.NetworkNavigation.Id == _mainnetID && x.Provider == _providerID && x.StartDate.Hour == targetDate.Hour && x.StartDate.DayOfWeek == targetDate.DayOfWeek;
            if (!_context.TpsandGasDataWeeks.Any(selector))
            {
                _context.TpsandGasDataWeeks.Add(new TpsandGasDataWeek()
                {
                    Network = _mainnetID,
                    AverageTps = entry.TPS,
                    AverageGps = entry.GPS,
                    Provider = _providerID,
                    StartDate = targetDate,
                    ReadingsCount = 1
                });
            }
            else
            {
                TpsandGasDataWeek x = _context.TpsandGasDataWeeks.First(selector);
                if (x.StartDate.Day == targetDate.Day)
                {
                    x.AverageTps = ((x.AverageTps * x.ReadingsCount) + entry.TPS) / ++x.ReadingsCount;
                    x.AverageGps = ((x.AverageGps * x.ReadingsCount) + entry.GPS) / ++x.ReadingsCount;
                }
                else
                {
                    x.AverageTps = entry.TPS;
                    x.AverageGps = entry.GPS;
                    x.ReadingsCount = 1;
                    x.StartDate = entry.Date;
                }
                _context.TpsandGasDataWeeks.Update(x);
            }
        }
        public void AddOrUpdateMonthTPSEntry(TPSGPSInfo entry)
        {
            if (DateTime.Now.Subtract(entry.Date).TotalDays > 31) return;

            DateTime targetDate = entry.Date
            .Subtract(TimeSpan.FromSeconds(entry.Date.Second))
            .Subtract(TimeSpan.FromMilliseconds(entry.Date.Millisecond))
            .Subtract(TimeSpan.FromMinutes(entry.Date.Minute))
            .Subtract(TimeSpan.FromHours(entry.Date.Hour));
            Func<TpsandGasDataMonth, bool> selector = x => x.NetworkNavigation.Id == _mainnetID && x.Provider == _providerID && x.StartDate.Day == targetDate.Day;
            if (!_context.TpsandGasDataMonths.Any(selector))
            {
                _context.TpsandGasDataMonths.Add(new TpsandGasDataMonth()
                {
                    Network = _mainnetID,
                    AverageTps = entry.TPS,
                    AverageGps = entry.GPS,
                    Provider = _providerID,
                    StartDate = targetDate,
                    ReadingsCount = 1
                });
            }
            else
            {
                TpsandGasDataMonth x = _context.TpsandGasDataMonths.First(selector);
                if (x.StartDate.Month == targetDate.Month)
                {
                    x.AverageTps = ((x.AverageTps * x.ReadingsCount) + entry.TPS) / ++x.ReadingsCount;
                    x.AverageGps = ((x.AverageGps * x.ReadingsCount) + entry.GPS) / ++x.ReadingsCount;
                }
                else
                {
                    x.AverageTps = entry.TPS;
                    x.AverageGps = entry.GPS;
                    x.ReadingsCount = 1;
                    x.StartDate = entry.Date;
                }
                _context.TpsandGasDataMonths.Update(x);
            }
        }

        public void AddOrUpdateYearTPSEntry(TPSGPSInfo entry)
        {
            if (DateTime.Now.Subtract(entry.Date).TotalDays > 365) return;

            DateTime targetDate = entry.Date
            .Subtract(TimeSpan.FromSeconds(entry.Date.Second))
            .Subtract(TimeSpan.FromMilliseconds(entry.Date.Millisecond))
            .Subtract(TimeSpan.FromMinutes(entry.Date.Minute))
            .Subtract(TimeSpan.FromHours(entry.Date.Hour))
            .Subtract(TimeSpan.FromDays(entry.Date.Day))
            .Add(TimeSpan.FromDays(1));
            Func<TpsandGasDataYear, bool> selector = x => x.NetworkNavigation.Id == _mainnetID && x.Provider == _providerID && x.StartDate.Month == targetDate.Month;
            if (!_context.TpsandGasDataYears.Any(selector))
            {
                _context.TpsandGasDataYears.Add(new TpsandGasDataYear()
                {
                    Network = _mainnetID,
                    AverageTps = entry.TPS,
                    AverageGps = entry.GPS,
                    Provider = _providerID,
                    StartDate = targetDate,
                    ReadingsCount = 1
                });
            }
            else
            {
                TpsandGasDataYear x = _context.TpsandGasDataYears.First(selector);
                if (x.StartDate.Year == targetDate.Year)
                {
                    x.AverageTps = ((x.AverageTps * x.ReadingsCount) + entry.TPS) / ++x.ReadingsCount;
                    x.AverageGps = ((x.AverageGps * x.ReadingsCount) + entry.GPS) / ++x.ReadingsCount;
                }
                else
                {
                    x.AverageTps = entry.TPS;
                    x.AverageGps = entry.GPS;
                    x.ReadingsCount = 1;
                    x.StartDate = entry.Date;
                }
                _context.TpsandGasDataYears.Update(x);
            }
        }

        public void AddOrUpdateAllTPSEntry(TPSGPSInfo entry)
        {
            DateTime targetDate = entry.Date
                .Subtract(TimeSpan.FromSeconds(entry.Date.Second))
                .Subtract(TimeSpan.FromMilliseconds(entry.Date.Millisecond))
                .Subtract(TimeSpan.FromMinutes(entry.Date.Minute))
                .Subtract(TimeSpan.FromHours(entry.Date.Hour))
                .Subtract(TimeSpan.FromDays(entry.Date.Day))
                .Add(TimeSpan.FromDays(1));
            Func<TpsandGasDataAll, bool> selector = x => x.NetworkNavigation.Id == _mainnetID && x.Provider == _providerID && x.StartDate.Month == targetDate.Month && x.StartDate.Year == targetDate.Year;
            if (!_context.TpsandGasDataAlls.Any(selector))
            {
                _context.TpsandGasDataAlls.Add(new TpsandGasDataAll()
                {
                    Network = _mainnetID,
                    AverageTps = entry.TPS,
                    AverageGps = entry.GPS,
                    Provider = _providerID,
                    StartDate = targetDate,
                    ReadingsCount = 1
                });
            }
            else
            {
                TpsandGasDataAll x = _context.TpsandGasDataAlls.First(selector);
                x.AverageTps = ((x.AverageTps * x.ReadingsCount) + entry.TPS) / ++x.ReadingsCount;
                x.AverageGps = ((x.AverageGps * x.ReadingsCount) + entry.GPS) / ++x.ReadingsCount;
                _context.TpsandGasDataAlls.Update(x);
            }
        }

        public void UpdateAllEntries(TPSGPSInfo entry)
        {
            UpdateMaxEntry(entry);
            UpdateLatestEntries(entry);
            AddOrUpdateMinuteTPSEntry(entry);
            AddOrUpdateHourTPSEntry(entry);
            AddOrUpdateDayTPSEntry(entry);
            AddOrUpdateWeekTPSEntry(entry);
            AddOrUpdateMonthTPSEntry(entry);
            AddOrUpdateYearTPSEntry(entry);
            AddOrUpdateAllTPSEntry(entry);
            _logger.LogInformation("Updated all time buckets");
        }
    }
}
