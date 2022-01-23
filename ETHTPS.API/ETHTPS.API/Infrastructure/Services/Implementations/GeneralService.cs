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
                result = Context.Providers.ToList().Where(x => x.Enabled).Select(x => new ProviderResponseModel()
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
                result = Context.Providers.Where(x => x.Enabled).ToDictionary(x => x.Name, x => x.Color);
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

        private static Dictionary<(bool IncludeSidechains, string Network, string Smoothing), (Dictionary<string, object> LastData, DateTime LastGetTime)> _instantDataDictionary = new Dictionary<(bool IncludeSidechains, string Network, string Smoothing), (Dictionary<string, object> LastData, DateTime LastGetTime)>();

        public IDictionary<string, object> InstantData(bool includeSidechains = true, string network = "Mainnet", string smoothing = "")
        {
            var interval = TimeInterval.Instant;
            if (!string.IsNullOrWhiteSpace(smoothing))
            {
                interval = Enum.Parse<TimeInterval>(smoothing);
            }
            var key = (includeSidechains, network, interval.ToString());
            if (!_instantDataDictionary.ContainsKey(key))
            {
                _instantDataDictionary.Add(key, (new Dictionary<string, object>(), DateTime.Now.Subtract(TimeSpan.FromSeconds(5))));
            }
            bool returnDefault = DateTime.Now.Subtract(_instantDataDictionary[key].LastGetTime).TotalSeconds < 3;
            if (!returnDefault)
            {
                _instantDataDictionary[key] = (new Dictionary<string, object>(), DateTime.Now);
                var result = _instantDataDictionary[key];
                switch (interval)
                {
                    case TimeInterval.Instant:
                        result.LastData.Add("tps", _tpsService.Instant(includeSidechains));
                        result.LastData.Add("gps", _gpsService.Instant(includeSidechains));
                        result.LastData.Add("gasAdjustedTPS", _gasAdjustedTPSService.Instant(includeSidechains));
                        break;
                    case TimeInterval.OneWeek:
                        var nextInterval = TimeInterval.OneMonth;
                        result.LastData.Add("tps", _tpsService.Get("All", nextInterval.ToString(), network, includeSidechains).ToDictionary(x => x.Key, x => new List<DataPoint>() { new DataPoint() { Value = x.Value.TakeLast(7).Average(x=>(x.Data.FirstOrDefault()==null)?0: x.Data.FirstOrDefault().Value) } }));

                        result.LastData.Add("gps", _gpsService.Get("All", nextInterval.ToString(), network, includeSidechains).ToDictionary(x => x.Key, x => new List<DataPoint>() { new DataPoint() { Value = x.Value.TakeLast(7).Average(x=>(x.Data.FirstOrDefault()==null)?0: x.Data.FirstOrDefault().Value) } }));

                        result.LastData.Add("gasAdjustedTPS", _gasAdjustedTPSService.Get("All", nextInterval.ToString(), network, includeSidechains).ToDictionary(x => x.Key, x => new List<DataPoint>() { new DataPoint() { Value = x.Value.TakeLast(7).Average(x=>(x.Data.FirstOrDefault()==null)?0: x.Data.FirstOrDefault().Value) } }));
                        break;
                    default:
                        nextInterval = GetNextIntervalForInstantData(interval);
                        result.LastData.Add("tps", _tpsService.Get("All", nextInterval.ToString(), network, includeSidechains).ToDictionary(x => x.Key, x => new List<DataPoint>() { x.Value.LastOrDefault()?.Data.FirstOrDefault() }));
                        result.LastData.Add("gps", _gpsService.Get("All", nextInterval.ToString(), network, includeSidechains).ToDictionary(x => x.Key, x => new List<DataPoint>() { x.Value.LastOrDefault()?.Data.FirstOrDefault() }));
                        result.LastData.Add("gasAdjustedTPS", _gasAdjustedTPSService.Get("All", nextInterval.ToString(), network, includeSidechains).ToDictionary(x => x.Key, x => new List<DataPoint>() { x.Value.LastOrDefault()?.Data.FirstOrDefault() }));
                        break;
                }
            }
            return _instantDataDictionary[key].LastData;
        }

        private static TimeInterval GetNextIntervalForInstantData(TimeInterval interval)
        {
            switch (interval)
            {
                case TimeInterval.OneMinute:
                    return TimeInterval.OneHour;
                case TimeInterval.OneHour:
                    return TimeInterval.OneDay;
                case TimeInterval.OneDay:
                    return TimeInterval.OneMonth;
                case TimeInterval.OneMonth:
                    return TimeInterval.OneYear;
                default:
                    return TimeInterval.OneDay;
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
                try
                {
                    var count = _tpsService.Get(provider, interval, network, true)[provider].Count();
                    if (count > 1)
                    {
                        if (interval == "All" && count < 12)
                            continue;

                        result.Add(interval);
                    }
                }
                catch { }
            }
            return result;
        }

        
        public IEnumerable<string> GetUniqueDataYears(string provider, string network = "Mainnet")
        {
            var entries = _tpsService.Get(provider, "All", network, true)[provider]?.Select(x => x.Data.FirstOrDefault()?.Date.Year.ToString())?.OrderBy(x => x).Distinct();
            return entries;
        }

        public AllDataModel GetAllData(string network)
        {
            return new AllDataModel()
            {
                Providers = Context.Providers.Select(x => new ProviderModel()
                {
                    Name = x.Name,
                    Type = x.TypeNavigation.Name
                }).ToArray(),
                AllTPSData = Intervals().Select(interval => new { interval, data = _tpsService.Get(Constants.All, interval, network, true) }).ToDictionary(x => x.interval, x => x.data),
                MaxData = Max(Constants.All, network),
                AllGPSData = Intervals().Select(interval => new { interval, data = _gpsService.Get(Constants.All, interval, network, true) }).ToDictionary(x => x.interval, x => x.data),
                AllGasAdjustedTPSData = Intervals().Select(interval => new { interval, data = _gasAdjustedTPSService.Get(Constants.All, interval, network, true) }).ToDictionary(x => x.interval, x => x.data),
            };
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
                    MaxTPS = MaxTPS(x.Name).FirstOrDefaultOrDefault().Data.FirstOrDefaultOrDefault().TPS,
                    Type = x.Type
                }),
                //TPSData = await BuildTPSDataAsync(network)
            };
        }
        */
    }
}
