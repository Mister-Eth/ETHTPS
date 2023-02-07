using ETHTPS.Data.Integrations.InfluxIntegration;
using ETHTPS.Services.BlockchainServices.Models;

using System.Threading.Tasks;

using static ETHTPS.Data.Integrations.InfluxIntegration.Extensions.IntegrationExtensions;

namespace ETHTPS.Services.BlockchainServices.Extensions
{
    public static class InfluxWrapperProviderExtensions
    {
        public static async Task LogBlockAsync(this IInfluxWrapper influxWrapper, BlockInfo blockInfo, string provider) => await influxWrapper.LogAsync(blockInfo, GetBlockBucketNameFor(provider));
        public static async Task LogTPSGPSInfoAsync(this IInfluxWrapper influxWrapper, TPSGPSInfo info)
        {
            var entries = info.Split();
            await influxWrapper.LogAsync(entries.TPSInfo, GetTPSBucketNameFor(info.Provider));
            await influxWrapper.LogAsync(entries.GPSInfo, GetGPSBucketNameFor(info.Provider));
        }
    }
}
