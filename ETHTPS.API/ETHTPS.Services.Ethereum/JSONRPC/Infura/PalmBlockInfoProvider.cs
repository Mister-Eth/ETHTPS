using ETHTPS.Services.Attributes;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.JSONRPC.Infura
{
    [Provider("Palm")]
    [RunsEvery(CronConstants.Every30s)]
    public class PalmBlockInfoProvider : InfuraBlockInfoProviderBase
    {
        public PalmBlockInfoProvider(IConfiguration configuration) : base(configuration, "PalmEndpoint")
        {

        }
    }
}
