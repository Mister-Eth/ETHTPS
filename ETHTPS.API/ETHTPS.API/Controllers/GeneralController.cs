using ETHTPS.Data;
using ETHTPS.Data.Database;
using ETHTPS.Data.Database.Extensions;
using ETHTPS.Data.Database.HistoricalDataProviders;
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
    public class GeneralController : APIControllerWithHistoricalMethodsBase
    {
        public GeneralController(ETHTPSContext context, IEnumerable<IHistoricalDataProvider> historicalDataProviders) : base(context, historicalDataProviders)
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
                Color = x.ProviderProperties.First(x => x.Name == "Color").Value,
                TheoreticalMaxTPS = int.Parse(x.ProviderProperties.First(x => x.Name == "TheoreticalMaxTPS").Value)
            });
        }

        [HttpGet]
        public IDictionary<string, string> ColorDictionary() => Context.ProviderProperties.Where(x => x.Name == "Color").ToDictionary(x => x.ProviderNavigation.Name, x => x.Value);

        [HttpGet]
        public IDictionary<string, string> ProviderTypesColorDictionary() => Context.ProviderTypeProperties.Where(x => x.Name == "Color").ToDictionary(x => x.ProviderTypeNavigation.Name, x => x.Value);


        private static Dictionary<string, object> _lastInstantData;
        private static DateTime _lastInstantDataGetTime = DateTime.MinValue;

        [HttpGet]
        public IDictionary<string, object> InstantData(bool includeSidechains = true)
        {
            if (DateTime.Now.Subtract(_lastInstantDataGetTime).TotalSeconds > 3)
            {
                var result = new Dictionary<string, object>();
                var tpsController = new TPSController(Context, HistoricalDataProviders);
                var gpsController = new GPSController(Context, HistoricalDataProviders);
                var gasAdjustedTPSController = new GasAdjustedTPSController(Context, HistoricalDataProviders);
                var instantGPS = gpsController.Instant(includeSidechains);
                result.Add("tps", tpsController.Instant(includeSidechains));
                result.Add("gps", instantGPS);
                result.Add("gasAdjustedTPS", gasAdjustedTPSController.Instant(includeSidechains));

                _lastInstantDataGetTime = DateTime.Now;
                _lastInstantData = result;
                Console.WriteLine("Updated instant data");
            }
            return _lastInstantData;
        }

        [HttpGet]
        public IDictionary<string, object> Max(string provider, string network = "Mainnet")
        {
            var result = new Dictionary<string, object>();
            var tpsController = new TPSController(Context, HistoricalDataProviders);
            var gpsController = new GPSController(Context, HistoricalDataProviders);
            var maxGPS = gpsController.Max(provider, network);
            result.Add("tps", tpsController.Max(provider, network));
            result.Add("gps", maxGPS);
            var gasAdjustedTPSController = new GasAdjustedTPSController(Context, HistoricalDataProviders);
            result.Add("gasAdjustedTPS", gasAdjustedTPSController.Max(provider, network));
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
