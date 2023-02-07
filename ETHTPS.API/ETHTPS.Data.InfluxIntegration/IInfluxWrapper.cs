using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ETHTPS.Data.Integrations.InfluxIntegration
{
    public interface IInfluxWrapper
    {
        Task LogAsync<T>(T entry, string bucket)
            where T : IMeasurement;
        Task LogAsync<T>(T entry)
            where T : IMeasurement => LogAsync(entry, null);
        Task<IEnumerable<string>> GetBucketsAsync();
        Task<bool> BucketExistsAsync(string bucket);
        Task CreateBucketAsync(string bucket);
        Task DeleteBucketAsync(string bucket);
        Task DeleteAllBucketsAsync();
        Task DeleteAllDataInBucketAsync(string bucket);
    }
}
