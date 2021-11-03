using ETHTPS.Data.Database;
using ETHTPS.Data.Database.Extensions;
using ETHTPS.Data.ResponseModels;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Controllers
{
    [Route("API/TPS/[action]")]
    public class TPSController : APIControllerBase
    {
        public TPSController(ETHTPSContext context) : base(context)
        {
        }

        [HttpGet]
        public IEnumerable<TPSResponseModel> Max(string provider, string network = "Mainnet")
        {
            var result = new List<TPSResponseModel>();
            var providers = (provider.ToUpper() == "ALL") ? Context.Providers.AsEnumerable() : new Provider[] { Context.Providers.First(x => x.Name.ToUpper() == provider.ToUpper()) };
            foreach (var p in providers.ToArray())
            {
                var entry = Context.TpsandGasDataMaxes.FirstOrDefault(x => x.Provider == p.Id && x.NetworkNavigation.Name == network);
                if (entry != null)
                {
                    result.Add(new TPSResponseModel()
                    {
                        Provider = p.Name,
                        Data = new List<TPSDataPoint>()
                        {
                            new TPSDataPoint()
                            {
                                Date = entry.Date,
                                TPS = entry.MaxTps
                            }
                        }
                    });
                }
                else
                {
                    //No max TPS data recorded yet, return 0
                    result.Add(new TPSResponseModel()
                    {
                        Provider = p.Name,
                        Data = new List<TPSDataPoint>()
                        {
                            new TPSDataPoint()
                            {
                                TPS = 0
                            }
                        }
                    });
                }
            }
            return result;
        }



        [HttpGet]
        public async Task<IEnumerable<TPSResponseModel>> GetAsync(string provider, string interval, string network = "Mainnet", bool includeSidechains = true)
        {
            var result = new List<TPSResponseModel>();
            if (provider.ToUpper() == "ALL")
            {
                foreach (var p in Context.Providers.ToList())
                {
                    if (!includeSidechains)
                    {
                        if (IsSidechain(p.Name))
                        {
                            continue;
                        }
                    }
                    result.Add(await Context.GetCachedResponseAsync<TPSResponseModel>("TPS", network, p.Name, interval));
                }
            }
            else
            {
                result.Add(await Context.GetCachedResponseAsync<TPSResponseModel>("TPS", network, provider, interval));
            }
            return result;
        }

        private async Task<Dictionary<string, Dictionary<string, IEnumerable<TPSResponseModel>>>> BuildTPSDataAsync(string network = "Mainnet")
        {
            var result = new Dictionary<string, Dictionary<string, IEnumerable<TPSResponseModel>>>();
            foreach (var provider in Context.Providers)
            {
                result[provider.Name] = new Dictionary<string, IEnumerable<TPSResponseModel>>();
                foreach (var interval in TimeIntervals())
                {
                    result[provider.Name][interval] = await GetAsync(provider.Name, interval, network);
                }
            }
            return result;
        }



        [HttpGet]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IDictionary<string, IEnumerable<TPSDataPoint>>> InstantAsync(bool includeSidechains = true)
        {
            var result = await Context.GetCachedResponseAsync<IEnumerable<TPSResponseModel>>("All", "TPS", "Instant");
            if (!includeSidechains)
            {
                result = result.Where(x => !IsSidechain(x.Provider));
            }
            return result.ToDictionary(x => x.Provider, x => x.Data.AsEnumerable());
        }


    }
}
