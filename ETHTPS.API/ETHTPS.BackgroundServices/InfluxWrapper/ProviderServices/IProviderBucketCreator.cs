using System.Threading.Tasks;

namespace ETHTPS.Services.InfluxWrapper.ProviderServices
{
    public interface IProviderBucketCreator
    {
        bool Created { get; }
        Task CreateBucketsForProvidersAsync();
    }
}
