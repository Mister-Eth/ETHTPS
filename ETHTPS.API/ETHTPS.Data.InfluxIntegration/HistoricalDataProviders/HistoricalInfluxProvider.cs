using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Extensions;
using ETHTPS.Data.Models.Query;

using Flux.Net;

using Block = ETHTPS.Data.Models.DataEntries.Block;

namespace ETHTPS.Data.Integrations.InfluxIntegration.HistoricalDataProviders
{
    public class HistoricalInfluxProvider : IAsyncHistoricalBlockInfoProvider
    {
        private readonly IInfluxWrapper _influxWrapper;
        private const string BLOCK_INFO = "blockinfo";
        public HistoricalInfluxProvider(IInfluxWrapper influxWrapper)
        {
            _influxWrapper = influxWrapper;
        }

        public async IAsyncEnumerable<IBlock> GetBlocksBetweenAsync(ProviderQueryModel model, DateTime start, DateTime end)
        {
            var query = @$"from(bucket: ""blockinfo"")
  |> range(start: {start.ToInfluxDateTime()}, stop: {end.ToInfluxDateTime()})
  |> filter(fn: (r) => r[""_measurement""] == ""blockinfo"")
  |> filter(fn: (r) => r[""provider""] == ""{model.Provider}"")
  |> yield(name: ""mean"")
 ";
            await foreach (var entry in _influxWrapper.QueryAsync<Block>(query))
            {
                yield return entry;
            }
        }

        public IAsyncEnumerable<IBlock> GetLatestBlocksAsync(ProviderQueryModel model, TimeInterval period) => GetBlocksBetweenAsync(model, DateTime.Now - period.ExtractTimeGrouping().ToTimeSpan(), DateTime.Now);
    }
}
