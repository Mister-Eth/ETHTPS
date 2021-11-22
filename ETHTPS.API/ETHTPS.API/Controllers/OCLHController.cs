using ETHTPS.Data.Database;
using ETHTPS.Data.Database.HistoricalDataProviders;
using ETHTPS.Data.Models;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Controllers
{
    [Route("API/OCLH/[action]")]
    public class OCLHController : APIControllerWithHistoricalMethodsBase
    {
        public OCLHController(ETHTPSContext context, IEnumerable<IHistoricalDataProvider> historicalDataProviders) : base(context, historicalDataProviders)
        {

        }

        [HttpGet]
        public IEnumerable<TPSGPSOCLH> OCLH(string interval, string provider, string network) => base.GetOCLH(interval, provider, network);
    }
}
