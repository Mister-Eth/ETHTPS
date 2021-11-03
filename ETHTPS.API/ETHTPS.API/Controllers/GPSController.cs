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
    [Route("API/GPS/[action]")]
    public class GPSController : APIControllerBase
    {
        public GPSController(ETHTPSContext context) : base(context)
        {

        }

        [HttpGet]
        public IEnumerable<GPSResponseModel> Max(string provider, string network = "Mainnet")
        {
            var result = new List<GPSResponseModel>();
            var providers = (provider.ToUpper() == "ALL") ? Context.Providers.AsEnumerable() : new Provider[] { Context.Providers.First(x => x.Name.ToUpper() == provider.ToUpper()) };
            foreach (var p in providers.ToArray())
            {
                var entry = Context.TpsandGasDataMaxes.FirstOrDefault(x => x.Provider == p.Id && x.NetworkNavigation.Name == network);
                if (entry != null)
                {
                    result.Add(new GPSResponseModel()
                    {
                        Provider = p.Name,
                        Data = new List<GPSDataPoint>()
                        {
                            new GPSDataPoint()
                            {
                                Date = entry.Date,
                                GPS = entry.MaxGps
                            }
                        }
                    });
                }
                else
                {
                    //No max TPS data recorded yet, return 0
                    result.Add(new GPSResponseModel()
                    {
                        Provider = p.Name,
                        Data = new List<GPSDataPoint>()
                        {
                            new GPSDataPoint()
                            {
                                GPS = 0
                            }
                        }
                    });
                }
            }
            return result;
        }


        [HttpGet]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IDictionary<string, IEnumerable<GPSDataPoint>>> InstantAsync(bool includeSidechains = true)
        {
            var result = await Context.GetCachedResponseAsync<IEnumerable<GPSResponseModel>>("All", "GPS", "Instant");
            if (!includeSidechains)
            {
                result = result.Where(x => !IsSidechain(x.Provider));
            }
            return result.ToDictionary(x => x.Provider, x => x.Data.AsEnumerable());
        }

        [HttpGet]
        public async Task<IEnumerable<GPSResponseModel>> GetAsync(string provider, string interval, string network = "Mainnet", bool includeSidechains = true)
        {
            var result = new List<GPSResponseModel>();
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
                    result.Add(await Context.GetCachedResponseAsync<GPSResponseModel>("GPS", network, p.Name, interval));
                }
            }
            else
            {
                result.Add(await Context.GetCachedResponseAsync<GPSResponseModel>("GPS", network, provider, interval));
            }
            return result;
        }
    }
}
