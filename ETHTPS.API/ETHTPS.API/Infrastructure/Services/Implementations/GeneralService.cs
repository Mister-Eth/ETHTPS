using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using ETHTPS.Data;
using ETHTPS.Data.Database;
using ETHTPS.Data.Database.Extensions;
using ETHTPS.Data.Database.HistoricalDataProviders;
using ETHTPS.Data.ResponseModels;
using ETHTPS.Data.ResponseModels.HomePage;

namespace ETHTPS.API.Infrastructure.Services.Implementations
{
    public class GeneralService : HistoricalMethodsServiceBase
    {
        private readonly TPSService _tpsService;
        private readonly GPSService _gpsService;
        private readonly GasAdjustedTPSService _gasAdjustedTPSService;

        public GeneralService(TPSService tpsService, GPSService gpsService, GasAdjustedTPSService gasAdjustedTPSService, ETHTPSContext context, IEnumerable<IHistoricalDataProvider> historicalDataProviders) : base(context, historicalDataProviders)
        {
            _tpsService = tpsService;
            _gpsService = gpsService;
            _gasAdjustedTPSService = gasAdjustedTPSService;
        }


        public IEnumerable<string> Networks()
        {
            IEnumerable<string> result;
            lock (Context.LockObj)
            {
                result = Context.Networks.Select(x => x.Name);
            }
            return result;
        }

        
        public IEnumerable<string> Intervals() => TimeIntervals();


        
        public IEnumerable<ProviderResponseModel> Providers()
        {
            IEnumerable<ProviderResponseModel> result;
            lock (Context.LockObj)
            {
                result = Context.Providers.ToList().Select(x => new ProviderResponseModel()
                {
                    Name = x.Name,
                    Type = x.TypeNavigation.Name,
                    Color = x.Color,
                    TheoreticalMaxTPS = x.TheoreticalMaxTps,
                    IsGeneralPurpose = (x.IsGeneralPurpose.HasValue) ? x.IsGeneralPurpose.Value == 1 : x.TypeNavigation.IsGeneralPurpose == 1
                });
            }
            return result;
        }

        
        public IDictionary<string, string> ColorDictionary()
        {
            IDictionary<string, string> result;
            lock (Context.LockObj)
            {
                result = Context.Providers.ToDictionary(x => x.Name, x => x.Color);
            }
            return result;
        }

        
        public IDictionary<string, string> ProviderTypesColorDictionary()
        {
            IDictionary<string, string> result;
            lock (Context.LockObj)
            {
                result = Context.ProviderTypes.ToDictionary(x => x.Name, x => x.Color);
            }
            return result;
        }


        private static Dictionary<string, object> _lastNonSmoothInstantData;
        private static DateTime _lastNonSmoothInstantDataGetTime = DateTime.MinValue;

        private static Dictionary<string, object> _lastSmoothInstantData;
        private static DateTime _lastSmoothInstantDataGetTime = DateTime.MinValue;

        public IDictionary<string, object> InstantData(bool includeSidechains = true, bool smooth = false, string network = "Mainnet")
        {
            if (!smooth)
            {
                if (DateTime.Now.Subtract(_lastNonSmoothInstantDataGetTime).TotalSeconds > 3)
                {
                    try
                    {
                        var result = new Dictionary<string, object>();
                        result.Add("tps", _tpsService.Instant(includeSidechains));
                        result.Add("gps", _gpsService.Instant(includeSidechains));
                        result.Add("gasAdjustedTPS", _gasAdjustedTPSService.Instant(includeSidechains));
                        _lastNonSmoothInstantDataGetTime = DateTime.Now;
                        _lastNonSmoothInstantData = result;
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                    }
                }
                return _lastNonSmoothInstantData;
            }
            else
            {
                if (DateTime.Now.Subtract(_lastSmoothInstantDataGetTime).TotalSeconds > 3)
                {
                    try
                    {
                        var result = new Dictionary<string, object>();
                        result.Add("tps", _tpsService.Get("All", "OneHour", network, includeSidechains).ToDictionary(x => x.Key, x => new List<DataPoint>() { x.Value.Last().Data.First() }));
                        result.Add("gps", _gpsService.Get("All", "OneHour", network, includeSidechains).ToDictionary(x => x.Key, x => new List<DataPoint>() { x.Value.Last().Data.First() }));
                        result.Add("gasAdjustedTPS", _gasAdjustedTPSService.Get("All", "OneHour", network, includeSidechains).ToDictionary(x => x.Key, x => new List<DataPoint>() { x.Value.Last().Data.First() }));
                        _lastSmoothInstantDataGetTime = DateTime.Now;
                        _lastSmoothInstantData = result;
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                    }
                }
                return _lastSmoothInstantData;
            }
        }

        
        public IDictionary<string, object> Max(string provider, string network = "Mainnet")
        {
            var result = new Dictionary<string, object>();
            lock (Context.LockObj)
            {
                var maxGPS = _gpsService.Max(provider, network);
                result.Add("tps", _tpsService.Max(provider, network));
                result.Add("gps", maxGPS);
                result.Add("gasAdjustedTPS", _gasAdjustedTPSService.Max(provider, network));
            }
            return result;
        }

        /// <summary>
        /// Used for displaying chart buttons.
        /// </summary>
        
        public IEnumerable<string> GetIntervalsWithData(string provider, string network = "Mainnet")
        {
            List<string> result = new();
            foreach (var interval in TimeIntervals())
            {
                var count = _tpsService.Get(provider, interval, network, true)[provider].Count();
                if (count > 1)
                {
                    if (interval == "All" && count < 12)
                        continue;

                    result.Add(interval);
                }
            }
            return result;
        }

        
        public IEnumerable<string> GetUniqueDataYears(string provider, string network = "Mainnet")
        {
            var entries = _tpsService.Get(provider, "All", network, true)[provider]?.Select(x => x.Data.First()?.Date.Year.ToString())?.OrderBy(x => x).Distinct();
            return entries;
        }

        /*
        
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
