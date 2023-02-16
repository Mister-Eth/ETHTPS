using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ETHTPS.API.Controllers
{
    [Route("/api/v3/BlockInfo/[action]")]
    public class BlockInfoController : Controller
    {
        private readonly IAsyncHistoricalBlockInfoProvider _asyncHistoricalBlockInfoProvider;

        public BlockInfoController(IAsyncHistoricalBlockInfoProvider asyncHistoricalBlockInfoProvider)
        {
            _asyncHistoricalBlockInfoProvider = asyncHistoricalBlockInfoProvider;
        }

        [HttpGet]
        public async Task<IEnumerable<IBlock>> GetBlocksBetweenAsync(ProviderQueryModel model, DateTime start, DateTime end)
        {
            return await _asyncHistoricalBlockInfoProvider.GetBlocksBetweenAsync(model, start, end);
        }

        [HttpGet]
        public async Task<IEnumerable<IBlock>> GetLatestBlocksAsync(ProviderQueryModel model, string period)
        {
            var result = TryParse(period);
            if (result == null)
            {
                return (IEnumerable<IBlock>)Task.FromResult((IAsyncEnumerable<IBlock>)BadRequest());
            }
            return await _asyncHistoricalBlockInfoProvider.GetLatestBlocksAsync(model, result.Value);
        }

        private static TimeInterval? TryParse(string value)
        {
            TimeInterval result;
            bool ok = Enum.TryParse<TimeInterval>(value, out result);
            return ok ? result : null;
        }
    }
}
