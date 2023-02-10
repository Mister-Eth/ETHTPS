using ETHTPS.Data.Integrations.MSSQL;
using static ETHTPS.Data.Integrations.InfluxIntegration.Extensions.IntegrationExtensions;

namespace ETHTPS.Data.Integrations.InfluxIntegration.ProviderServices
{
    public class ProviderBucketCreator : IBucketCreator
    {
        private readonly IEnumerable<string> _providers;
        private readonly IInfluxWrapper _influxWrapper;
        public ProviderBucketCreator(IInfluxWrapper influxWrapper, EthtpsContext context)
        {
            _influxWrapper = influxWrapper;
            _providers = context.Providers.Select(p => p.Name).ToList();
        }
        public bool Created { get; private set; } = false;

        public async Task CreateBucketsAsync()
        {
            if (!Created)
            {
                //await _influxWrapper.DeleteAllBucketsAsync();
                var existing = await _influxWrapper.GetBucketsAsync();
                var whatShouldBeAll = _providers.SelectMany(x => new[]
                {
                    GetBlockBucketNameFor(x)
                }); //This adds a suffix which needs to be removed in order to not end up with Name_X_X buckets
                foreach (var provider in whatShouldBeAll.Where(x => !existing.Contains(x)).ToArray())
                {
                    await _influxWrapper.CreateBucketsIfNeededAsync(provider.ClearBucketNameSuffix());
                }
                Created = true;
            }
        }
    }
}
