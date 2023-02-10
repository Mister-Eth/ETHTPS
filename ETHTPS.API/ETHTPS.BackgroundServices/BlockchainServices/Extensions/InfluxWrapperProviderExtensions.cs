using ETHTPS.Data.Integrations.InfluxIntegration;
using ETHTPS.Services.BlockchainServices.Models;

using System.Threading.Tasks;

using static ETHTPS.Data.Integrations.InfluxIntegration.Extensions.IntegrationExtensions;

namespace ETHTPS.Services.BlockchainServices.Extensions
{
    public static class InfluxWrapperProviderExtensions
    {
        public static async Task LogProviderBlockAsync(this IInfluxWrapper influxWrapper, BlockInfo blockInfo, string provider) => await influxWrapper.LogAsync(blockInfo, GetBlockBucketNameFor(provider));
        public static async Task LogBlockAsync(this IInfluxWrapper influxWrapper, BlockInfo blockInfo) => await influxWrapper.LogAsync(blockInfo, "blockinfo");
    }
}
