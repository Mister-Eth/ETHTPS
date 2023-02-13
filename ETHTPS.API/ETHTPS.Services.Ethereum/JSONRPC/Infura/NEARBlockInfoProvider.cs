using ETHTPS.Services.Attributes;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.JSONRPC.Infura
{
    [Provider("NEAR")]
    [RunsEvery(CronConstants.Every30s)]
    public class NEARBlockInfoProvider : InfuraBlockInfoProviderBase
    {
        public NEARBlockInfoProvider(IConfiguration configuration) : base(configuration, "NEAREndpoint")
        {

        }
    }
}
