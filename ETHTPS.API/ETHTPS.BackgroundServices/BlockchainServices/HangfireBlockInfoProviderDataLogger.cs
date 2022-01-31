using ETHTPS.Data.Database;
using ETHTPS.Services.BlockchainServices.Extensions;

using Hangfire;

using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices
{
    public class HangfireBlockInfoProviderDataLogger<T> : HangfireBackgroundService
        where T : IBlockInfoProvider
    {
        protected readonly T _instance;
        protected readonly string _provider;
        protected readonly int _providerID;

        public HangfireBlockInfoProviderDataLogger(T instance, ILogger<HangfireBackgroundService> logger, ETHTPSContext context) : base(logger, context)
        {
            _instance = instance;
            _provider = _instance.GetProviderName();
            _providerID = _context.Providers.First(x => x.Name == _provider).Id;
        }

        [AutomaticRetry(Attempts = 1, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        public override async Task RunAsync()
        {
            try
            {
                var delta = await CalculateTPSGPSAsync();
                UpdateMaxEntry(delta);
                UpdateLatestEntries(delta);

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
                _logger.LogError("TPSDataUpdaterBase", e);
                throw;
            }
        }

        private void UpdateLatestEntries(TPSGPSInfo entry)
        {
            Func<TpsandGasDataLatest, bool> selector = x => x.NetworkNavigation.Name == "Mainnet" && x.ProviderNavigation.Name == _provider;
            if (!_context.TpsandGasDataLatests.Any(selector))
            {
                _context.TpsandGasDataLatests.Add(new TpsandGasDataLatest()
                {
                    Gps = entry.GPS,
                    Tps = entry.TPS,
                    Network = 1,
                    Provider = _providerID
                });
            }
            else
            {
                var x = _context.TpsandGasDataLatests.First(selector);
                x.Tps = entry.TPS;
                x.Gps = entry.GPS;
                _context.TpsandGasDataLatests.Update(x);
            }
        }
        protected async Task<TPSGPSInfo> CalculateTPSGPSAsync() => await CalculateTPSGPSAsync(await _instance.GetLatestBlockInfoAsync());
        protected async Task<TPSGPSInfo> CalculateTPSGPSAsync(int blockNumber) => await CalculateTPSGPSAsync(await _instance.GetBlockInfoAsync(blockNumber));
        protected async Task<TPSGPSInfo> CalculateTPSGPSAsync(BlockInfo latestBlock)
        {
            if (_instance.BlockTimeSeconds > 0)
            {
                return new TPSGPSInfo()
                {
                    BlockNumber = latestBlock.BlockNumber,
                    Date = latestBlock.Date,
                    GPS = latestBlock.GasUsed / _instance.BlockTimeSeconds,
                    TPS = latestBlock.TransactionCount / _instance.BlockTimeSeconds
                };
            }
            else //Add up all blocks submitted at the same time
            {
                var result = new TPSGPSInfo()
                {
                    Date = latestBlock.Date
                };
                BlockInfo secondToLatestBlock;
                int count = 0;
                do
                {
                    result.TPS += latestBlock.TransactionCount;
                    result.GPS += latestBlock.GasUsed;

                    secondToLatestBlock = await _instance.GetBlockInfoAsync(latestBlock.BlockNumber - 1);
                    if (secondToLatestBlock.Date.Subtract(latestBlock.Date).TotalSeconds != 0)
                    {
                        result.TPS /= Math.Abs(secondToLatestBlock.Date.Subtract(result.Date).TotalSeconds);
                        result.GPS /= Math.Abs(secondToLatestBlock.Date.Subtract(result.Date).TotalSeconds);
                        break;
                    }
                    latestBlock = secondToLatestBlock;
                    await Task.Delay(200);
                    if (++count == 100)
                    {
                        throw new Exception($"Possible infinite loop {(typeof(T))}");
                    }
                }
                while (true);
                return result;
            }
        }
        protected void UpdateMaxEntry(TPSGPSInfo entry)
        {
            Func<TpsandGasDataMax, bool> selector = x => x.ProviderNavigation.Name == _provider && x.NetworkNavigation.Name == "Mainnet";
            if (!_context.TpsandGasDataMaxes.Any(selector))
            {
                _context.TpsandGasDataMaxes.Add(new TpsandGasDataMax()
                {
                    Date = entry.Date,
                    MaxGps = entry.GPS,
                    MaxTps = entry.TPS,
                    Network = 1,
                    Provider = _providerID
                });
            }
            else
            {
                var targetEntry = _context.TpsandGasDataMaxes.First(selector);
                if (entry.TPS > targetEntry.MaxTps)
                {
                    targetEntry.MaxTps = entry.TPS;
                }
                if (entry.GPS > targetEntry.MaxGps)
                {
                    targetEntry.MaxGps = entry.GPS;
                }
                _context.TpsandGasDataMaxes.Update(targetEntry);
            }
        }

        protected void AddOrUpdateHourTPSEntry(TPSGPSInfo entry)
        {
            var targetDate = entry.Date
                .Subtract(TimeSpan.FromSeconds(entry.Date.Second))
                .Subtract(TimeSpan.FromMilliseconds(entry.Date.Millisecond));
            Func<TpsandGasDataHour, bool> selector = x => x.NetworkNavigation.Name == "Mainnet" && x.Provider == _providerID && x.StartDate.Minute == targetDate.Minute;
            if (!_context.TpsandGasDataHours.Any(selector))
            {
                _context.TpsandGasDataHours.Add(new TpsandGasDataHour()
                {
                    Network = 1,
                    AverageTps = entry.TPS,
                    AverageGps = entry.GPS,
                    Provider = _providerID,
                    StartDate = targetDate,
                    ReadingsCount = 1
                });
            }
            else
            {
                var x = _context.TpsandGasDataHours.First(selector);
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
            var targetDate = entry.Date
                .Subtract(TimeSpan.FromSeconds(entry.Date.Second))
                .Subtract(TimeSpan.FromMilliseconds(entry.Date.Millisecond))
                .Subtract(TimeSpan.FromMinutes(entry.Date.Minute));
            Func<TpsandGasDataDay, bool> selector = x => x.NetworkNavigation.Name == "Mainnet" && x.Provider == _providerID && x.StartDate.Hour == targetDate.Hour;
            if (!_context.TpsandGasDataDays.Any(selector))
            {
                _context.TpsandGasDataDays.Add(new TpsandGasDataDay()
                {
                    Network = 1,
                    AverageTps = entry.TPS,
                    AverageGps = entry.GPS,
                    Provider = _providerID,
                    StartDate = targetDate,
                    ReadingsCount = 1
                });
            }
            else
            {
                var x = _context.TpsandGasDataDays.First(selector);
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
            var targetDate = entry.Date
                .Subtract(TimeSpan.FromSeconds(entry.Date.Second))
                .Subtract(TimeSpan.FromMilliseconds(entry.Date.Millisecond))
                .Subtract(TimeSpan.FromMinutes(entry.Date.Minute));
            Func<TpsandGasDataWeek, bool> selector = x => x.NetworkNavigation.Name == "Mainnet" && x.Provider == _providerID && x.StartDate.Hour == targetDate.Hour && x.StartDate.DayOfWeek == targetDate.DayOfWeek;
            if (!_context.TpsandGasDataWeeks.Any(selector))
            {
                _context.TpsandGasDataWeeks.Add(new TpsandGasDataWeek()
                {
                    Network = 1,
                    AverageTps = entry.TPS,
                    AverageGps = entry.GPS,
                    Provider = _providerID,
                    StartDate = targetDate,
                    ReadingsCount = 1
                });
            }
            else
            {
                var x = _context.TpsandGasDataWeeks.First(selector);
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
            var targetDate = entry.Date
                .Subtract(TimeSpan.FromSeconds(entry.Date.Second))
                .Subtract(TimeSpan.FromMilliseconds(entry.Date.Millisecond))
                .Subtract(TimeSpan.FromMinutes(entry.Date.Minute))
                .Subtract(TimeSpan.FromHours(entry.Date.Hour));
            Func<TpsandGasDataMonth, bool> selector = x => x.NetworkNavigation.Name == "Mainnet" && x.Provider == _providerID && x.StartDate.Day == targetDate.Day;
            if (!_context.TpsandGasDataMonths.Any(selector))
            {
                _context.TpsandGasDataMonths.Add(new TpsandGasDataMonth()
                {
                    Network = 1,
                    AverageTps = entry.TPS,
                    AverageGps = entry.GPS,
                    Provider = _providerID,
                    StartDate = targetDate,
                    ReadingsCount = 1
                });
            }
            else
            {
                var x = _context.TpsandGasDataMonths.First(selector);
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
            var targetDate = entry.Date
                .Subtract(TimeSpan.FromSeconds(entry.Date.Second))
                .Subtract(TimeSpan.FromMilliseconds(entry.Date.Millisecond))
                .Subtract(TimeSpan.FromMinutes(entry.Date.Minute))
                .Subtract(TimeSpan.FromHours(entry.Date.Hour))
                .Subtract(TimeSpan.FromDays(entry.Date.Day))
                .Add(TimeSpan.FromDays(1));
            Func<TpsandGasDataYear, bool> selector = x => x.NetworkNavigation.Name == "Mainnet" && x.Provider == _providerID && x.StartDate.Month == targetDate.Month;
            if (!_context.TpsandGasDataYears.Any(selector))
            {
                _context.TpsandGasDataYears.Add(new TpsandGasDataYear()
                {
                    Network = 1,
                    AverageTps = entry.TPS,
                    AverageGps = entry.GPS,
                    Provider = _providerID,
                    StartDate = targetDate,
                    ReadingsCount = 1
                });
            }
            else
            {
                var x = _context.TpsandGasDataYears.First(selector);
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
            var targetDate = entry.Date
                .Subtract(TimeSpan.FromSeconds(entry.Date.Second))
                .Subtract(TimeSpan.FromMilliseconds(entry.Date.Millisecond))
                .Subtract(TimeSpan.FromMinutes(entry.Date.Minute))
                .Subtract(TimeSpan.FromHours(entry.Date.Hour))
                .Subtract(TimeSpan.FromDays(entry.Date.Day))
                .Add(TimeSpan.FromDays(1));
            Func<TpsandGasDataAll, bool> selector = x => x.NetworkNavigation.Name == "Mainnet" && x.Provider == _providerID && x.StartDate.Month == targetDate.Month && x.StartDate.Year == targetDate.Year;
            if (!_context.TpsandGasDataAlls.Any(selector))
            {
                _context.TpsandGasDataAlls.Add(new TpsandGasDataAll()
                {
                    Network = 1,
                    AverageTps = entry.TPS,
                    AverageGps = entry.GPS,
                    Provider = _providerID,
                    StartDate = targetDate,
                    ReadingsCount = 1
                });
            }
            else
            {
                var x = _context.TpsandGasDataAlls.First(selector);
                x.AverageTps = ((x.AverageTps * x.ReadingsCount) + entry.TPS) / ++x.ReadingsCount;
                x.AverageGps = ((x.AverageGps * x.ReadingsCount) + entry.GPS) / ++x.ReadingsCount;
                _context.TpsandGasDataAlls.Update(x);
            }
        }
    }
}
