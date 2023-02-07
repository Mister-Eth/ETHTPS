namespace ETHTPS.Data.Integrations.InfluxIntegration.Extensions
{
    public static class IntegrationExtensions
    {
        private static async Task CreateBucketIfNeededAsync(IInfluxWrapper influxWrapper, string name)
        {
            if (!await influxWrapper.BucketExistsAsync(name))
            {
                await influxWrapper.CreateBucketAsync(name);
            }
        }
        public static async Task CreateBucketsIfNeededAsync(this IInfluxWrapper influxWrapper, string providerName)
        {
            await CreateBucketIfNeededAsync(influxWrapper, GetBlockBucketNameFor(providerName));
            await CreateBucketIfNeededAsync(influxWrapper, GetTPSBucketNameFor(providerName));
            await CreateBucketIfNeededAsync(influxWrapper, GetGPSBucketNameFor(providerName));
        }
        public static string GetTPSBucketNameFor(string provider) => $"{provider}_TPS";
        public static string GetGPSBucketNameFor(string provider) => $"{provider}_GPS";
        public static string GetBlockBucketNameFor(string provider) => $"{provider}_blocks";
        public static string ClearBucketNameSuffix(this string provider) => provider.Replace("_TPS", string.Empty).Replace("_GPS", string.Empty).Replace("_blocks", string.Empty);
    }
}
