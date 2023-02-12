using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.Data.Core;
using ETHTPS.Data.Models.Query;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;

namespace ETHTPS.API.Controllers
{
    [Route("/api/v3/[controller]/[action]")]
    public class BlockInfoController : Controller
    {
        private readonly IAsyncHistoricalBlockInfoProvider _asyncHistoricalBlockInfoProvider;

        public BlockInfoController(IAsyncHistoricalBlockInfoProvider asyncHistoricalBlockInfoProvider)
        {
            _asyncHistoricalBlockInfoProvider = asyncHistoricalBlockInfoProvider;
        }

        [HttpGet]
        public IAsyncEnumerable<IBlock> GetBlocksBetweenAsync(ProviderQueryModel model, DateTime start, DateTime end)
        {
            return _asyncHistoricalBlockInfoProvider.GetBlocksBetweenAsync(model, start, end);
        }

        [HttpGet]
        public IAsyncEnumerable<IBlock> GetLatestBlocksAsync(ProviderQueryModel model, string period)
        {
            var result = TryParse(period);
            if (result == null)
            {
                return (IAsyncEnumerable<IBlock>)BadRequest();
            }
            return _asyncHistoricalBlockInfoProvider.GetLatestBlocksAsync(model, result.Value);
        }

        private static TimeInterval? TryParse(string value)
        {
            TimeInterval result;
            bool ok = Enum.TryParse<TimeInterval>(value, out result);
            return ok ? result : null;
        }
    }
}
