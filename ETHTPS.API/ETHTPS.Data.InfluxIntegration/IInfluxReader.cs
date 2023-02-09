namespace ETHTPS.Data.Integrations.InfluxIntegration
{
    /// <summary>
    /// Provides InfluxDB read operations
    /// </summary>
    public interface IInfluxReader
    {
        Task<IEnumerable<string>> GetBucketsAsync();
        Task<bool> BucketExistsAsync(string bucket);
    }
}
