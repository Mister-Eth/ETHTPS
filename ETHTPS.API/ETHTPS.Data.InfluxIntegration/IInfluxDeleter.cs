namespace ETHTPS.Data.Integrations.InfluxIntegration
{
    /// <summary>
    /// Providers InfluxDB delete operations
    /// </summary>
    public interface IInfluxDeleter
    {
        Task DeleteBucketAsync(string bucket);
        Task DeleteAllBucketsAsync();
        Task DeleteAllDataInBucketAsync(string bucket);
    }
}
