using ETHTPS.Data;
using ETHTPS.Data.Database;
using ETHTPS.Data.ResponseModels;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Controllers
{
    [Route("API/v2/[action]")]
    public class APIV2Controller : ControllerBase
    {
        private readonly ETHTPSContext _context;

        public APIV2Controller(ETHTPSContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<ProviderResponseModel> Providers()
        {
            return _context.Providers.ToList().Select(x => new ProviderResponseModel()
            {
                Name = x.Name,
                Type = _context.ProviderTypes.First(y => y.Id == x.Type.Value).Name
            });
        }

        [HttpGet]
        public IEnumerable<string> ProviderTypes()
        {
            return _context.ProviderTypes.Select(x=>x.Name);
        }

        [HttpGet]
        public IEnumerable<string> Networks()
        {
            return _context.Networks.Select(x=>x.Name);
        }

        [HttpGet]
        public IEnumerable<string> Intervals()
        {
            foreach (var interval in Enum.GetValues(typeof(TimeInterval)))
            {
                if (interval.ToString() == "Instant" || interval.ToString() == "Latest")
                    continue;

                yield return interval.ToString();
            }
        }

        [HttpGet]
        public async Task<IEnumerable<TPSResponseModel>> GetTPS(string provider, string interval, string network) => await _context.GetOrAddCachedResponseAsync<IEnumerable<TPSResponseModel>>(provider, interval);
    }
}
