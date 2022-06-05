using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using ETHTPS.Data;
using ETHTPS.Data.Database;
using ETHTPS.Data.Database.Extensions;
using ETHTPS.Data.Database.HistoricalDataProviders;
using ETHTPS.Data.Extensions.StringExtensions;
using ETHTPS.Data.Models.Query;
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
                    IsGeneralPurpose = (x.IsGeneralPurpose.HasValue) ? x.IsGeneralPurpose.Value == 1 : x.TypeNavigation.IsGeneralPurpose == 1,
                    IsSubchainOf = x.SubchainOfNavigation?.Name
                });
            }
            return result;
        }

        public IEnumerable<ProviderResponseModel> Providers(string subchainsOf) => Providers().Where(x => x.Name.LossyCompareTo(subchainsOf));

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

        public IDictionary<string, object> InstantData(ProviderQueryModel model, string smoothing = "")
        {
            var interval = TimeInterval.Instant;
            if (!string.IsNullOrWhiteSpace(smoothing))
            {
                interval = Enum.Parse<TimeInterval>(smoothing);
            }
            var key = (model.IncludeSidechains, model.Network, interval.ToString());
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
                        result.LastData.Add("tps", _tpsService.Instant(model));
                        result.LastData.Add("gps", _gpsService.Instant(model));
                        result.LastData.Add("gasAdjustedTPS", _gasAdjustedTPSService.Instant(model));
                        break;
                    case TimeInterval.OneWeek:
                        var nextInterval = TimeInterval.OneMonth;
                        result.LastData.Add("tps", _tpsService.Get(model, nextInterval.ToString()).Where(x => x.Value.Any()).ToDictionary(x => x.Key, x => new List<DataPoint>() { new DataPoint() { Value = x.Value.TakeLast(7).Average(x => (x.Data.FirstOrDefault() == null) ? 0 : x.Data.FirstOrDefault().Value) } }));

                        result.LastData.Add("gps", _gpsService.Get(model, nextInterval.ToString()).Where(x => x.Value.Any()).ToDictionary(x => x.Key, x => new List<DataPoint>() { new DataPoint() { Value = x.Value.TakeLast(7).Average(x => (x.Data.FirstOrDefault() == null) ? 0 : x.Data.FirstOrDefault().Value) } }));

                        result.LastData.Add("gasAdjustedTPS", _gasAdjustedTPSService.Get(model, nextInterval.ToString()).Where(x => x.Value.Any()).ToDictionary(x => x.Key, x => new List<DataPoint>() { new DataPoint() { Value = x.Value.TakeLast(7).Average(x => (x.Data.FirstOrDefault() == null) ? 0 : x.Data.FirstOrDefault().Value) } }));
                        break;
                    default:
                        nextInterval = GetNextIntervalForInstantData(interval);
                        result.LastData.Add("tps", _tpsService.Get(model, nextInterval.ToString()).ToDictionary(x => x.Key, x => new List<DataPoint>() { x.Value.LastOrDefault()?.Data.FirstOrDefault() }));
                        result.LastData.Add("gps", _gpsService.Get(model, nextInterval.ToString()).ToDictionary(x => x.Key, x => new List<DataPoint>() { x.Value.LastOrDefault()?.Data.FirstOrDefault() }));
                        result.LastData.Add("gasAdjustedTPS", _gasAdjustedTPSService.Get(model, nextInterval.ToString()).ToDictionary(x => x.Key, x => new List<DataPoint>() { x.Value.LastOrDefault()?.Data.FirstOrDefault() }));
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

        public IDictionary<string, object> Max(ProviderQueryModel model)
        {
            var result = new Dictionary<string, object>();
            lock (Context.LockObj)
            {
                var maxGPS = _gpsService.Max(model);
                result.Add("tps", _tpsService.Max(model));
                result.Add("gps", maxGPS);
                result.Add("gasAdjustedTPS", _gasAdjustedTPSService.Max(model));
            }
            return result;
        }

        /// <summary>
        /// Used for displaying chart buttons.
        /// </summary>

        public IEnumerable<string> GetIntervalsWithData(ProviderQueryModel model)
        {
            List<string> result = new();
            foreach (var interval in TimeIntervals())
            {
                try
                {
                    var count = _tpsService.Get(model, interval)[model.Provider].Count();
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


        public IEnumerable<string> GetUniqueDataYears(ProviderQueryModel model)
        {
            var entries = _tpsService.Get(model, Constants.All)[model.Provider]?.Select(x => x.Data.FirstOrDefault()?.Date.Year.ToString())?.OrderBy(x => x).Distinct();
            return entries;
        }

        public AllDataModel GetAllData(string network)
        {
            var allDataModel = new ProviderQueryModel()
            {
                Provider = Constants.All,
                Network = network
            };
            return new AllDataModel()
            {
                Providers = Context.Providers.Select(x => new ProviderModel()
                {
                    Name = x.Name,
                    Type = x.TypeNavigation.Name
                }).ToArray(),
                AllTPSData = Intervals().Select(interval => new { interval, data = _tpsService.Get(allDataModel, interval) }).ToDictionary(x => x.interval, x => x.data),
                MaxData = Max(allDataModel),
                AllGPSData = Intervals().Select(interval => new { interval, data = _gpsService.Get(allDataModel, interval) }).ToDictionary(x => x.interval, x => x.data),
                AllGasAdjustedTPSData = Intervals().Select(interval => new { interval, data = _gasAdjustedTPSService.Get(allDataModel, interval) }).ToDictionary(x => x.interval, x => x.data),
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
