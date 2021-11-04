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
        private readonly T _instance;
        private readonly string _provider;
        private readonly int _providerID;

        public HangfireBlockInfoProviderDataLogger(T instance, ILogger<HangfireBackgroundService> logger, ETHTPSContext context) : base(logger, context)
        {
            _instance = instance;
            _provider = _instance.GetProviderName();
            _providerID = _context.Providers.First(x => x.Name == _provider).Id;
        }

        [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        public override async Task RunAsync()
        {
            try
            {
                var latestBlock = await _instance.GetLatestBlockInfoAsync();
                var secondToLatestBlock = await _instance.GetBlockInfoAsync(latestBlock.BlockNumber - 1);
                if (latestBlock != null && secondToLatestBlock != null)
                {
                    var delta = latestBlock - secondToLatestBlock;
                    UpdateMaxEntry(delta);
                    await _context.SaveChangesAsync();

                    _logger.LogInformation($"{_provider}: {delta.TPS}TPS {delta.GPS}GPS");
                }
            }
            catch (Exception e)
            {
                _logger.LogError("TPSDataUpdaterBase", e);
                throw;
            }
        }

        public void UpdateMaxEntry(TPSGPSInfo entry)
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
    }
}
