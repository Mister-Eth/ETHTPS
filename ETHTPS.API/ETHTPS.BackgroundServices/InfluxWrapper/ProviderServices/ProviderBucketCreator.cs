using ETHTPS.Data.Database;
using ETHTPS.Services.InfluxWrapper.ProviderServices.Extensions;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Services.InfluxWrapper.ProviderServices
{
    public class ProviderBucketCreator : IProviderBucketCreator
    {
        private readonly IEnumerable<string> _providers;
        private readonly IInfluxWrapper _influxWrapper;
        public ProviderBucketCreator(IInfluxWrapper influxWrapper, EthtpsContext context)
        {
            _influxWrapper = influxWrapper;
            _providers = context.Providers.Select(p => p.Name).ToList();
        }
        public bool Created { get; private set; } = false;

        public async Task CreateBucketsForProvidersAsync()
        {
            if (!Created)
            {
                //await _influxWrapper.DeleteAllBucketsAsync();
                var existing = await _influxWrapper.GetBucketsAsync();
                var whatShouldBeAll = _providers.SelectMany(x => new[]
                {
                    InfluxWrapperProviderExtensions.GetTPSBucketNameFor(x),
                    InfluxWrapperProviderExtensions.GetGPSBucketNameFor(x),
                    InfluxWrapperProviderExtensions.GetBlockBucketNameFor(x),
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
