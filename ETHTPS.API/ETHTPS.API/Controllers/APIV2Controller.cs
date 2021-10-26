using ETHTPS.Data;
using ETHTPS.Data.Database;
using ETHTPS.Data.ResponseModels;

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
                Type = _context.ProviderTypes.First(y => y.Id == x.Type.Value).Name
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

#if DEBUG

        [HttpGet]
        public string RecalculateMaxTPS()
        {
            foreach(var provider in _context.Providers.ToList())
            {
                var maxTPS = _context.TPSData.Where(x => x.Provider == provider.Id).Max(x => x.Tps);
                if (_context.MaxTPSEntries.Any(x => x.Provider == provider.Id))
                {
                    var entry = _context.MaxTPSEntries.First(x => x.Provider == provider.Id);
                    entry.Entry = _context.TPSData.First(x => x.Provider == provider.Id && x.Tps == maxTPS).Id;
                    _context.MaxTPSEntries.Update(entry);
                }
                else
                {
                    _context.MaxTPSEntries.Add(new MaxTPSEntry()
                    {
                        Provider = provider.Id
                    });
                }
            }
            _context.SaveChanges();
            return "ok";
        }

#endif

        [HttpGet]
        public IEnumerable<TPSResponseModel> MaxTPS(string provider)
        {
            var result = new List<TPSResponseModel>();
            var providers = (provider.ToUpper() == "ALL") ? _context.Providers.AsEnumerable() : new Provider[] { _context.Providers.First(x => x.Name.ToUpper() == provider.ToUpper()) };
            foreach(var p in providers.ToArray())
            {
                var entry = _context.MaxTPSEntries.FirstOrDefault(x => x.Provider == p.Id);
                if (entry != null)
                {
                    var targetEntry = _context.TPSData.First(x => x.Id == entry.Entry);
                    result.Add(new TPSResponseModel()
                    {
                        Date = targetEntry.Date.Value,
                        TPS = targetEntry.Tps.Value,
                        Provider = p.Name
                    });
                }
            }
            return result;
        }

        [HttpGet]
        public async Task<IEnumerable<TPSResponseModel>> TPS(string provider, string interval, string network, bool includeSidechains = true)
        {
            var response = await _context.GetOrAddCachedResponseAsync<IEnumerable<TPSResponseModel>>(provider, interval);
            if (provider.ToUpper() == "ANY")
            {
                if (!includeSidechains)
                {
                    response = response.Where(x => !IsSidechain(x.Provider));
                }
            }
            foreach(var x in response)
            {
                if (string.IsNullOrWhiteSpace(x.Color))
                {
                    if (string.IsNullOrWhiteSpace(x.Provider))
                    {
                        x.Provider = provider;
                    }
                    var providerID = await _context.GetProviderIDAsync(x.Provider);
                    x.Color = _context.ProviderProperties.First(y => y.Name == "Color" && y.Provider.Value == providerID).Value;
                }
            }
            var responseList = response.ToList();
            /*if (provider.ToUpper() == "ANY")
            {
                responseList.Add(new TPSResponseModel() //Add a filler response equal to the sum of all providers in order to disprlay half a doughnut chart
                {
                    Color = "#000000",
                    Date = DateTime.Now,
                    Provider = "All",
                    TPS = response.Sum(x => x.TPS)
                });
            }*/
            return responseList;
        }

        private bool IsSidechain(string provider)
        {
            var sidechainID = _context.ProviderTypes.First(x => x.Name == "Sidechain").Id;
            var dbProvider = _context.Providers.First(x => x.Name.ToUpper() == provider.ToUpper());
            return dbProvider.Type == sidechainID;
        }
    }
}
