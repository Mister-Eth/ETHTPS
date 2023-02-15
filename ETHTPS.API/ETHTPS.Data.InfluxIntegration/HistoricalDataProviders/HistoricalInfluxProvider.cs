using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Extensions;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;

using Flux.Net;

using Block = ETHTPS.Data.Core.Models.DataEntries.Block;

namespace ETHTPS.Data.Integrations.InfluxIntegration.HistoricalDataServices
{
    public class HistoricalInfluxProvider : IAsyncHistoricalBlockInfoProvider
    {
        private readonly IInfluxWrapper _influxWrapper;
        private const string BLOCK_INFO = "blockinfo";
        public HistoricalInfluxProvider(IInfluxWrapper influxWrapper)
        {
            _influxWrapper = influxWrapper;
        }
        /*
         from(bucket: "blockinfo")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "blockinfo")
  |> filter(fn: (r) => r["_field"] == "transactioncount")
  |> filter(fn: (r) => r["provider"] == "Ethereum")
  |> window(timeColumn: "_time", createEmpty: false, every: 1h)
  |> mean()
  |> group(columns: ["provider"])
  |> yield(name: "Time buckets")
         */
        public async Task<IEnumerable<IBlock>> GetBlocksBetweenAsync(ProviderQueryModel model, DateTime start, DateTime end)
        {
            var query = @$"from(bucket: ""blockinfo"")
  |> range(start: {start.ToInfluxDateTime()}, stop: {end.ToInfluxDateTime()})
  |> filter(fn: (r) => r[""_measurement""] == ""blockinfo"")
  |> filter(fn: (r) => r[""_field""] == ""transactioncount"")
  |> filter(fn: (r) => r[""provider""] == ""{model.Provider}"")
  |> window(timeColumn: ""_time"", createEmpty: false, every: 1{(end - start).ToFluxTimeUnit()})
  |> mean()
  |> group(columns: [""provider""])
  |> yield(name: ""Time buckets"")
 ";
            var result = await _influxWrapper.QueryAsync<Block>(query, new DomainEntityConverter());
            return result;
        }

        public async Task<IEnumerable<IBlock>> GetLatestBlocksAsync(ProviderQueryModel model, TimeInterval period) => await GetBlocksBetweenAsync(model, DateTime.Now - period.ExtractTimeGrouping().ToTimeSpan(), DateTime.Now);
    }
}
