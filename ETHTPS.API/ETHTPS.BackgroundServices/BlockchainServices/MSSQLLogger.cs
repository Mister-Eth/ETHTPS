using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Services.BlockchainServices.Models;
using Hangfire;

using Microsoft.Extensions.Logging;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices
{
    public class MSSQLLogger<T> : BlockInfoProviderDataLoggerBase<T>
         where T : IBlockInfoProvider
    {
        protected override string ServiceName { get=> $"MSSQLLogger<{typeof(T).Name}>"; }

        public MSSQLLogger(T instance, ILogger<HangfireBackgroundService> logger, EthtpsContext context, IDataUpdaterStatusService statusService) : base(instance, logger, context, statusService, UpdaterType.TPSGPS)
        {
        }
        [AutomaticRetry(Attempts = 1, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        public override async Task RunAsync()
        {
            try
            {
                TPSGPSInfo delta = await CalculateTPSGPSAsync();
                UpdateMaxEntry(delta);
                UpdateLatestEntries(delta);

                AddOrUpdateMinuteTPSEntry(delta);
                AddOrUpdateHourTPSEntry(delta);
                AddOrUpdateDayTPSEntry(delta);
                AddOrUpdateWeekTPSEntry(delta);
                AddOrUpdateMonthTPSEntry(delta);
                AddOrUpdateYearTPSEntry(delta);
                AddOrUpdateAllTPSEntry(delta);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"{_provider}: {delta.TPS}TPS {delta.GPS}GPS");
            }
            catch (Exception e)
            {
                _logger.LogError("MSSQLLogger", e);
            }
        }

        private void UpdateLatestEntries(TPSGPSInfo entry)
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
       
        protected void UpdateMaxEntry(TPSGPSInfo entry)
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

        protected void AddOrUpdateMinuteTPSEntry(TPSGPSInfo entry)
        {
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

        protected void AddOrUpdateHourTPSEntry(TPSGPSInfo entry)
        {
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
        protected void AddOrUpdateDayTPSEntry(TPSGPSInfo entry)
        {
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
        protected void AddOrUpdateWeekTPSEntry(TPSGPSInfo entry)
        {
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
        protected void AddOrUpdateMonthTPSEntry(TPSGPSInfo entry)
        {
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

        protected void AddOrUpdateYearTPSEntry(TPSGPSInfo entry)
        {
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

        protected void AddOrUpdateAllTPSEntry(TPSGPSInfo entry)
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
    }
}
