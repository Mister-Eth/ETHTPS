using ETHTPS.Data.Integrations.InfluxIntegration;
using ETHTPS.Data.Core.Models.DataEntries;

using System.Threading.Tasks;

using static ETHTPS.Data.Integrations.InfluxIntegration.Extensions.IntegrationExtensions;

namespace ETHTPS.Services.BlockchainServices.Extensions
{
    public static class InfluxWrapperProviderExtensions
    {
        public static async Task LogProviderBlockAsync(this IInfluxWrapper influxWrapper, Block blockInfo, string provider) => await influxWrapper.LogAsync(blockInfo, GetBlockBucketNameFor(provider));
        public static async Task LogBlockAsync(this IInfluxWrapper influxWrapper, Block blockInfo) => await influxWrapper.LogAsync(blockInfo, "blockinfo");
        public static async Task LogBlocksAsync(this IInfluxWrapper influxWrapper, params Block[] blockInfo) => await influxWrapper.LogAsync(blockInfo, "blockinfo");
    }
}
