using ETHTPS.Data;
using ETHTPS.Data.Database;
using ETHTPS.Data.Database.Extensions;
using ETHTPS.Data.ResponseModels;
using ETHTPS.Data.ResponseModels.HomePage;

using Microsoft.AspNetCore.Cors;
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
                Type = _context.ProviderTypes.First(y => y.Id == x.Type).Name,
                Color = _context.ProviderProperties.FirstOrDefault(y => y.Name == "Color" && y.Provider == x.Id)?.Value
            });
        }

        [HttpGet]
        public IEnumerable<string> ProviderTypes()
        {
            return _context.ProviderTypes.Select(x => x.Name);
        }

        [HttpGet]
        public IEnumerable<string> Networks()
        {
            return _context.Networks.Select(x => x.Name);
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
        public IEnumerable<TPSResponseModel> MaxTPS(string provider, string network = "Mainnet")
        {
            var result = new List<TPSResponseModel>();
            var providers = (provider.ToUpper() == "ALL") ? _context.Providers.AsEnumerable() : new Provider[] { _context.Providers.First(x => x.Name.ToUpper() == provider.ToUpper()) };
            foreach (var p in providers.ToArray())
            {
                var entry = _context.TpsandGasDataMaxes.FirstOrDefault(x => x.Provider == p.Id && x.NetworkNavigation.Name == network);
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
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IDictionary<string, IEnumerable<TPSDataPoint>>> InstantTPSAsync(bool includeSidechains = true)
        {
            var result = await _context.GetCachedResponseAsync<IEnumerable<TPSResponseModel>>("All", "Instant");
            if (!includeSidechains)
            {
                result = result.Where(x => !IsSidechain(x.Provider));
            }
            return result.ToDictionary(x => x.Provider, x => x.Data.AsEnumerable());
        }

        [HttpGet]
        public async Task<IEnumerable<TPSResponseModel>> TPSAsync(string provider, string interval, string network, bool includeSidechains = true)
        {
            var result = new List<TPSResponseModel>();
            if (provider.ToUpper() == "ALL")
            {
                foreach(var p in _context.Providers.ToList())
                {
                    if (!includeSidechains)
                    {
                        if (IsSidechain(p.Name))
                        {
                            continue;
                        }
                    }
                    result.Add(await _context.GetCachedResponseAsync<TPSResponseModel>(p.Name, interval));
                }
            }
            else
            {
                result.Add(await _context.GetCachedResponseAsync<TPSResponseModel>(provider, interval));
            }
            return result;
        }

        [HttpGet]
        public async Task<HomePageViewModel> HomePageModelAsync(string network = "Mainnet")
        {
            var x = Providers();
            ;
            return new HomePageViewModel()
            {
                InstantTPS = await InstantTPSAsync(),
                ColorDictionary = Providers().ToDictionary(x => x.Name, x => x.Color),
                ProviderData = Providers().Select(x => new ProviderInfo()
                {
                    Name = x.Name,
                    MaxTPS = MaxTPS(x.Name).FirstOrDefault().Data.FirstOrDefault().TPS,
                    Type = x.Type
                }),
                //TPSData = await BuildTPSDataAsync(network)
            };
        }

        private async Task<Dictionary<string, Dictionary<string, IEnumerable<TPSResponseModel>>>> BuildTPSDataAsync(string network)
        {
            var result = new Dictionary<string, Dictionary<string, IEnumerable<TPSResponseModel>>>();
            foreach(var provider in Providers())
            {
                result[provider.Name] = new Dictionary<string, IEnumerable<TPSResponseModel>>();
                foreach(var interval in Intervals())
                {
                    result[provider.Name][interval] = await TPSAsync(provider.Name, interval, network);
                }
            }
            return result;
        }

        private bool IsSidechain(string provider)
        {
            var sidechainID = _context.ProviderTypes.First(x => x.Name == "Sidechain").Id;
            var dbProvider = _context.Providers.First(x => x.Name.ToUpper() == provider.ToUpper());
            return dbProvider.Type == sidechainID;
        }
    }
}
