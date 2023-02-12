using Flux.Net;

namespace ETHTPS.Data.Integrations.InfluxIntegration.Extensions
{
    public static class IntegrationExtensions
    {
        private static async Task CreateBucketIfNeededAsync<TWrapper>(TWrapper influxWrapper, string name)
             where TWrapper : IInfluxReader, IInfluxWriter
        {
            if (!await influxWrapper.BucketExistsAsync(name))
            {
                await influxWrapper.CreateBucketAsync(name);
            }
        }
        public static async Task CreateBucketsIfNeededAsync<TWrapper>(this TWrapper influxWrapper, string providerName)
            where TWrapper : IInfluxReader, IInfluxWriter
        {
            await CreateBucketIfNeededAsync(influxWrapper, GetBlockBucketNameFor(providerName));
            /*
            await CreateBucketIfNeededAsync(influxWrapper, GetTPSBucketNameFor(providerName));
            await CreateBucketIfNeededAsync(influxWrapper, GetGPSBucketNameFor(providerName));*/
        }
        [Obsolete("Only block buckets are allowed; the minimum amount of data should be stored db-side", true)]
        public static string GetTPSBucketNameFor(string provider) => $"{provider}_TPS";
        [Obsolete("Only block buckets are allowed; the minimum amount of data should be stored db-side", true)]
        public static string GetGPSBucketNameFor(string provider) => $"{provider}_GPS";
        public static string GetBlockBucketNameFor(string provider) => $"{provider}_blocks";
        public static string ClearBucketNameSuffix(this string provider) => provider.Replace("_TPS", string.Empty).Replace("_GPS", string.Empty).Replace("_blocks", string.Empty);
        
        /// <summary>
        /// <see cref="Flux.Net.FluxQuery.ToQuery"/> returns a query containing "bucket/[optional]" and we need to clean it.
        /// </summary>
        public static string ToCleanFluxQuery(this FluxQuery fluxQuery) => fluxQuery.ToQuery().Replace("/autogen", string.Empty);
    }
}
