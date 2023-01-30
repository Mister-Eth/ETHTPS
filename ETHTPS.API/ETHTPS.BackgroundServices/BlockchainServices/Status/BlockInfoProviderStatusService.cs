using ETHTPS.Data.Database;
using ETHTPS.Data.Models.Query;
using ETHTPS.Services.BlockchainServices.Extensions;

using Hangfire;
using Hangfire.Storage;

using System;
using System.Collections.Generic;
using System.Linq;

namespace ETHTPS.Services.BlockchainServices.Status
{
    public class BlockInfoProviderStatusService : IBlockInfoProviderStatusService
    {
        private readonly EthtpsContext _context;

        public BlockInfoProviderStatusService(EthtpsContext context)
        {
            _context = context;
        }

        public IDictionary<string, BlockInfoProviderStatusResult> GetBlockInfoProviderStatus(ProviderQueryModel model)
        {
            Dictionary<string, BlockInfoProviderStatusResult> result = new();
            if (model.Provider.ToUpper() == "ALL")
            {
                foreach (var providerName in _context.Providers.ToList().Select(x => x.Name))
                {
                    result[providerName] = GetStatus(ProviderQueryModel.FromProviderName(providerName));
                }
            }
            else
            {
                result[model.Provider] = GetStatus(ProviderQueryModel.FromProviderName(model.Provider));
            }
            return result;
        }

        private BlockInfoProviderStatusResult GetStatus(ProviderQueryModel model)
        {
            IStorageConnection connection = JobStorage.Current.GetConnection();
            Func<RecurringJobDto, bool> selector = x => x.Job.Type.GetProviderNameFromFirstGenericArgument() == model.Provider && typeof(HangfireBlockInfoProviderDataLogger<>).IsAssignableFrom(x.Job.Type);
            var result = new BlockInfoProviderStatusResult()
            {
                Status = BlockInfoProviderStatus.NotImplemented,
                Details = $"No {nameof(IBlockInfoProvider)} found for {model.Provider}"
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
