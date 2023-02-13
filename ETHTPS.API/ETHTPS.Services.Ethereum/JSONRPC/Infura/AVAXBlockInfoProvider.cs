using ETHTPS.Services.Attributes;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.JSONRPC.Infura
{
    [Provider("AVAX C-chain")]
    [RunsEvery(CronConstants.Every30s)]
    public class AVAXBlockInfoProvider : InfuraBlockInfoProviderBase
    {
        public AVAXBlockInfoProvider(IConfiguration configuration) : base(configuration, "AVAXEndpoint")
        {

        }
    }
}
