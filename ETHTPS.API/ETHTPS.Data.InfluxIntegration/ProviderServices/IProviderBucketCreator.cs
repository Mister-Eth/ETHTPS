using System.Threading.Tasks;

namespace ETHTPS.Data.Integrations.InfluxIntegration.ProviderServices
{
    public interface IBucketCreator
    {
        bool Created { get; }
        Task CreateBucketsAsync();
    }
}
