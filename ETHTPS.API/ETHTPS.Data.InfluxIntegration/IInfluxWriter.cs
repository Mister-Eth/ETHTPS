using ETHTPS.Data.Core;

namespace ETHTPS.Data.Integrations.InfluxIntegration
{
    /// <summary>
    /// Provides InfluxDB write operations
    /// </summary>
    public interface IInfluxWriter
    {
        Task LogAsync<T>(T[] entries, string bucket)
            where T : IMeasurement;
        Task LogAsync<T>(T entry, string bucket)
            where T : IMeasurement;
        Task LogAsync<T>(T entry)
            where T : IMeasurement => LogAsync(entry, null);
        Task CreateBucketAsync(string bucket);
    }
}
