using ETHTPS.Data.Database;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.Extensions;

using Hangfire;
using Hangfire.Storage;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Status
{
    public class BlockInfoProviderStatusService : IBlockInfoProviderStatusService
    {
        private readonly ETHTPSContext _context;

        public BlockInfoProviderStatusService(ETHTPSContext context)
        {
            _context = context;
        }

        public IDictionary<string, BlockInfoProviderStatusResult> GetBlockInfoProviderStatus(string provider)
        {
            Dictionary<string, BlockInfoProviderStatusResult> result = new();
            if (provider.ToUpper() == "ALL")
            {
                foreach(var providerName in _context.Providers.ToList().Select(x => x.Name))
                {
                    result[providerName] = GetStatus(providerName);
                }
            }
            else
            {
                result[provider] = GetStatus(provider);
            }
            return result;
        }

        private BlockInfoProviderStatusResult GetStatus(string provider)
        {
            IStorageConnection connection = JobStorage.Current.GetConnection();
            Func<RecurringJobDto, bool> selector = x => x.Job.Type.GetProviderNameFromFirstGenericArgument() == provider && typeof(HangfireBlockInfoProviderDataLogger<>).IsAssignableFrom(x.Job.Type);
            var result = new BlockInfoProviderStatusResult()
            {
                Status = BlockInfoProviderStatus.NotImplemented,
                Details = $"No {nameof(IBlockInfoProvider)} found for {provider}"
            };
            if (connection.GetRecurringJobs().Any(selector))
            {
                var job = connection.GetRecurringJobs().First(selector);
                if (job.LastExecution.HasValue)
                {
                    var lastExecution = job.LastExecution.Value;
                    if (DateTime.Now.ToUniversalTime().Subtract(lastExecution.ToUniversalTime()).TotalHours >= 1)
                    {
                        result.Status = BlockInfoProviderStatus.NeedsAttention;
                    }
                    else
                    {
                        result.Status = BlockInfoProviderStatus.Ok;
                    }
                }
                else
                {
                    result.Status = BlockInfoProviderStatus.Down;
                }
                result.Details = string.Empty;
            }
            return result;
        }
    }
}
