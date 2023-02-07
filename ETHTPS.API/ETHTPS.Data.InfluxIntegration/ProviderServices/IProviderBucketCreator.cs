using System.Threading.Tasks;

namespace ETHTPS.Data.Integrations.InfluxIntegration.ProviderServices
{
    public interface IProviderBucketCreator
    {
        bool Created { get; }
        Task CreateBucketsForProvidersAsync();
    }
}
