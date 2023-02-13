using ETHTPS.Services.Attributes;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.JSONRPC.Infura
{
    [Provider("Optimism")]
    [RunsEvery(CronConstants.Every5s)]
    public class OptimismBlockInfoProvider : InfuraBlockInfoProviderBase
    {
        public OptimismBlockInfoProvider(IConfiguration configuration) : base(configuration, "OptimismEndpoint")
        {

        }
    }
}
