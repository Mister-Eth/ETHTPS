using ETHTPS.Data.Core;

using InfluxDB.Client;

namespace ETHTPS.Data.Integrations.InfluxIntegration
{
    /// <summary>
    /// Provides InfluxDB read operations
    /// </summary>
    public interface IInfluxReader
    {
        Task<IEnumerable<string>> GetBucketsAsync();
        Task<bool> BucketExistsAsync(string bucket);
        IAsyncEnumerable<TMeasurement> GetEntriesBetween<TMeasurement>(string bucket, string measurement, DateTime start, DateTime end) where TMeasurement : IMeasurement;
        IAsyncEnumerable<TMeasurement> GetEntriesForPeriod<TMeasurement>(string bucket, string measurement, TimeInterval period) where TMeasurement : IMeasurement;
        Task<IEnumerable<T>> QueryAsync<T>(string query, IDomainObjectMapper mapper = null) where T : IMeasurement;
        IAsyncEnumerable<T> QueryAsyncEnumerable<T>(string query) where T : IMeasurement;
    }
}
