using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.Models;
using System.Threading.Tasks;

namespace ETHTPS.Services.InfluxWrapper.ProviderServices.Extensions
{
    public static class InfluxWrapperProviderExtensions
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

        public static async Task LogBlockAsync(this IInfluxWrapper influxWrapper, BlockInfo blockInfo, string provider) => await influxWrapper.LogAsync(blockInfo, GetBlockBucketNameFor(provider)); 
        public static async Task LogTPSGPSInfoAsync(this IInfluxWrapper influxWrapper, TPSGPSInfo info)
        {
            var entries = info.Split();
            await influxWrapper.LogAsync(entries.TPSInfo, GetTPSBucketNameFor(info.Provider));
            await influxWrapper.LogAsync(entries.GPSInfo, GetGPSBucketNameFor(info.Provider));
        }

        public static string GetTPSBucketNameFor(string provider)=> $"{provider}_TPS";
        public static string GetGPSBucketNameFor(string provider)=> $"{provider}_GPS";
        public static string GetBlockBucketNameFor(string provider)=> $"{provider}_blocks";
        public static string ClearBucketNameSuffix(this string provider) => provider.Replace("_TPS", string.Empty).Replace("_GPS", string.Empty).Replace("_blocks", string.Empty);
    }
}
