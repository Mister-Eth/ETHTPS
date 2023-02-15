using ETHTPS.Data.Core.Models.DataEntries;
using ETHTPS.Services.Attributes;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.Ethereum.JSONRPC;

using Fizzler.Systems.HtmlAgilityPack;

using HtmlAgilityPack;

using Microsoft.Extensions.Configuration;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Services.Ethereum
{
    [Provider("Arbitrum Nova")]
    [RunsEvery(CronConstants.Every10s)]
    public class ArbitrumNovaBlockInfoProvider : JSONRPCBlockInfoProviderBase
    {
        private const string NAME = "Arbitrum Nova";
        private readonly string _transactionCountSelector;
        private readonly string _dateSelector;
        private readonly string _gasSelector;

        public ArbitrumNovaBlockInfoProvider(IConfiguration configuration) : base(configuration, NAME)
        {
            var config = configuration.GetSection(NAME);
            _transactionCountSelector = config.GetValue<string>("TransactionCountSelector");
            _dateSelector = config.GetValue<string>("DateSelector");
            _gasSelector = config.GetValue<string>("GasSelector");
        }

        //Arbitrum Nova doesn't have an implementation for eth_getBlockByNumber yet
        public override Task<Block> GetBlockInfoAsync(int blockNumber)
        {
            HtmlWeb web = new HtmlWeb();
            HtmlDocument doc = web.Load($"https://nova-explorer.arbitrum.io/block/{blockNumber}/transactions");
            var txCountNode = doc.DocumentNode.QuerySelectorAll(_transactionCountSelector);
            var txCount = new string(string.Join(" ", txCountNode.Select(x => x.InnerText)).Where(Char.IsNumber).ToArray());

            var gasNode = doc.DocumentNode.QuerySelectorAll(_gasSelector);
            var gas = new string(string.Join(" ", gasNode.Select(x => x.InnerText.Substring(0, x.InnerText.IndexOf("|")))).Where(Char.IsNumber).ToArray());

            var dateNode = doc.DocumentNode.QuerySelectorAll(_dateSelector);
            var date = string.Join(" ", dateNode.Select(x => x.Attributes["data-from-now"].Value));
            return Task.FromResult(new Block()
            {
                TransactionCount = int.Parse(txCount),
                Date = DateTime.Parse(date),
                BlockNumber = blockNumber,
                GasUsed = double.Parse(gas)
            });
        }
    }
}
