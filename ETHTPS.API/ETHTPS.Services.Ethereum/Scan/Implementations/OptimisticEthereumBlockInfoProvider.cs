using ETHTPS.Services.BlockchainServices;

using Fizzler.Systems.HtmlAgilityPack;
using ETHTPS.Data.Core.Models.DataEntries;
using HtmlAgilityPack;

using Microsoft.Extensions.Configuration;

using System;
using System.Linq;
using System.Threading.Tasks;
using ETHTPS.Services.Attributes;

namespace ETHTPS.Services.Ethereum.Scan.Implementations
{
    [Provider("Optimism")]
    [Disabled]
    [Obsolete("Use JSONRPC.OptimismBlockInfoProvider instead", true)]
    public class OptimisticEthereumBlockInfoProvider : ScanBlockInfoProviderBase
    {
        private readonly string _targetElementSelector;
        private readonly string _baseURL;
        public OptimisticEthereumBlockInfoProvider(IConfiguration configuration) : base(configuration, "Optimistic Ethereum")
        {
            var config = configuration.GetSection("BlockInfoProviders").GetSection("Optimistic Ethereum").GetSection("InstantTPS");
            _targetElementSelector = config.GetValue<string>("Selector");
            _baseURL = config.GetValue<string>("URL");
        }

        public override Task<Block> GetLatestBlockInfoAsync()
        {
            HtmlWeb web = new();
            HtmlDocument doc = web.Load(_baseURL);

            var nodes = doc.DocumentNode.QuerySelectorAll(_targetElementSelector);
            var x = new string(nodes.First().InnerText.Where(c => char.IsNumber(c) || c == '.').ToArray());
            var data = new Block()
            {
                Date = DateTime.Now,
                TransactionCount = (int)(5 * float.Parse(x))
            };
            return Task.FromResult(data);
        }
    }
}
