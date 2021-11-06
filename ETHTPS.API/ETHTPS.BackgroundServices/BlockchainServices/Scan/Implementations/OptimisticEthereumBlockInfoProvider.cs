using Fizzler.Systems.HtmlAgilityPack;

using HtmlAgilityPack;

using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Scan.Implementations
{
    [Provider("Optimism")]
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

        public override Task<BlockInfo> GetLatestBlockInfoAsync()
        {
            HtmlWeb web = new();
            HtmlDocument doc = web.Load(_baseURL);

            var nodes = doc.DocumentNode.QuerySelectorAll(_targetElementSelector);
            var x = new string(nodes.First().InnerText.Where(c => char.IsNumber(c) || c == '.').ToArray());
            var data = new BlockInfo()
            {
                Date = DateTime.Now,
                TransactionCount = (int)(5 * float.Parse(x))
            };
            return Task.FromResult(data);
        }
    }
}
