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
    public class GeneralController : APIControllerBase
    {
        public GeneralController(ETHTPSContext context) : base(context)
        {
        }

        [HttpGet]
        public IEnumerable<string> Networks()
        {
            return Context.Networks.Select(x => x.Name);
        }

        [HttpGet]
        public IEnumerable<string> Intervals() => TimeIntervals();


        [HttpGet]
        public IEnumerable<ProviderResponseModel> Providers()
        {
            return Context.Providers.ToList().Select(x => new ProviderResponseModel()
            {
                Name = x.Name,
                Type = x.TypeNavigation.Name,
                Color = x.ProviderProperties.First(x => x.Name == "Color").Value
            });
        }

        [HttpGet]
        public IDictionary<string, string> ColorDictionary() => Context.ProviderProperties.Where(x => x.Name == "Color").ToDictionary(x => x.ProviderNavigation.Name, x => x.Value);

        [HttpGet]
        public IDictionary<string, string> ProviderTypesColorDictionary() => Context.ProviderTypeProperties.Where(x => x.Name == "Color").ToDictionary(x => x.ProviderTypeNavigation.Name, x => x.Value);

        [HttpGet]
        public IDictionary<string, object> InstantData(bool includeSidechains = true)
        {
            var result = new Dictionary<string, object>();
            var tpsController = new TPSController(Context, null);
            var gpsController = new GPSController(Context, null);
            var instantGPS = gpsController.Instant(includeSidechains);
            result.Add("tps", tpsController.Instant(includeSidechains));
            result.Add("gps", instantGPS);
            Dictionary<string, List<DataPoint>> gasAdjustedTPS = new();
            foreach (var entry in instantGPS)
            {
                gasAdjustedTPS.Add(entry.Key, new List<DataPoint>()
                {
                    new DataPoint()
                {
                    Date = instantGPS[entry.Key].First().Date,
                    Value = instantGPS[entry.Key].First().Value / 21000
                }
                });
            }
            result.Add("gasAdjustedTPS", gasAdjustedTPS);
            return result;
        }

        [HttpGet]
        public IDictionary<string, object> Max(string provider, string network = "Mainnet")
        {
            var result = new Dictionary<string, object>();
            var tpsController = new TPSController(Context, null);
            var gpsController = new GPSController(Context, null);
            var maxGPS = gpsController.Max(provider, network);
            result.Add("tps", tpsController.Max(provider, network));
            result.Add("gps", maxGPS);
            Dictionary<string, DataPoint> gasAdjustedTPS = new();
            foreach(var entry in maxGPS)
            {
                gasAdjustedTPS.Add(entry.Key, new DataPoint()
                {
                    Date = maxGPS[entry.Key].Date,
                    Value = maxGPS[entry.Key].Value / 21000
                });
            }
            result.Add("gasAdjustedTPS", gasAdjustedTPS);
            return result;
        }

        /*
        [HttpGet]
        public async Task<HomePageViewModel> HomePageModelAsync(string network = "Mainnet")
        {
            return new HomePageViewModel()
            {
                InstantTPS = await InstantTPSAsync(),
                ColorDictionary = _context.Providers.ToDictionary(x => x.Name, x => x.Color),
                ProviderData = _context.Providers.Select(x => new ProviderInfo()
                {
                    Name = x.Name,
                    MaxTPS = MaxTPS(x.Name).FirstOrDefault().Data.FirstOrDefault().TPS,
                    Type = x.Type
                }),
                //TPSData = await BuildTPSDataAsync(network)
            };
        }
        */
    }
}
