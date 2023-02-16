using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Integrations.MSSQL.HistoricalDataServices;
using ETHTPS.Data.Core.Extensions.StringExtensions;
using ETHTPS.Data.ResponseModels;
using ETHTPS.Data.Core;
using ETHTPS.API.Core.Services;
using ETHTPS.API.Core.Integrations.MSSQL.Services.Data;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.Data.Core.Models.DataUpdater;
using ETHTPS.Data.Core.Models.DataPoints;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.TPS;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.GPS;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.GTPS;

namespace ETHTPS.API.Core.Integrations.MSSQL.Services
{
    public class GeneralService : HistoricalMethodsServiceBase
    {
        private readonly ITPSService _tpsService;
        private readonly IGPSService _gpsService;
        private readonly IGTPSService _gasAdjustedTPSService;
        private readonly IDataUpdaterStatusService _dataUpdaterStatusService;

        public GeneralService(ITPSService tpsService, IGPSService gpsService, IGTPSService gasAdjustedTPSService, EthtpsContext context, IEnumerable<IHistoricalDataProvider> historicalDataServices, IDataUpdaterStatusService dataUpdaterStatusService) : base(context, historicalDataServices)
        {
            _tpsService = tpsService;
            _gpsService = gpsService;
            _gasAdjustedTPSService = gasAdjustedTPSService;
            _dataUpdaterStatusService = dataUpdaterStatusService;
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


        public IEnumerable<TimeInterval> Intervals() => TimeIntervals();

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
                    IsGeneralPurpose = x.IsGeneralPurpose ?? x.TypeNavigation.IsGeneralPurpose,
                    IsSubchainOf = x.SubchainOfNavigation?.Name,
                    Status = _dataUpdaterStatusService.GetStatusFor(x.Name, UpdaterType.BlockInfo)
                });
            }
            return result;
        }

        public IEnumerable<ProviderResponseModel> Providers(string subchainsOf)
        {
            IEnumerable<ProviderResponseModel> list = Providers();
            if (string.IsNullOrWhiteSpace(subchainsOf) || subchainsOf.LossyCompareTo(Constants.All))
            {
                return list;
            }
            return Enumerable.Where(list, x => x.Name.LossyCompareTo(subchainsOf));
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

        private static Dictionary<(bool IncludeSidechains, string Network, string Smoothing), (Dictionary<string, object> LastData, DateTime LastGetTime)> _instantDataDictionary = new();

        public IDictionary<string, object> InstantData(ProviderQueryModel model, string smoothing = "")
        {
            TimeInterval interval = TimeInterval.Instant;
            if (!string.IsNullOrWhiteSpace(smoothing))
            {
                interval = Enum.Parse<TimeInterval>(smoothing);
            }
            (bool IncludeSidechains, string Network, string) key = (model.IncludeSidechains, model.Network, interval.ToString());
            if (!_instantDataDictionary.ContainsKey(key))
            {
                _instantDataDictionary.Add(key, (new Dictionary<string, object>(), DateTime.Now.Subtract(TimeSpan.FromSeconds(5))));
            }
            bool returnDefault = DateTime.Now.Subtract(_instantDataDictionary[key].LastGetTime).TotalSeconds < 3;
            if (!returnDefault)
            {
                _instantDataDictionary[key] = (new Dictionary<string, object>(), DateTime.Now);
                (Dictionary<string, object> LastData, DateTime LastGetTime) result = _instantDataDictionary[key];
                switch (interval)
                {
                    case TimeInterval.Instant:
                        result.LastData.Add("tps", _tpsService.Instant(model));
                        result.LastData.Add("gps", _gpsService.Instant(model));
                        result.LastData.Add("gasAdjustedTPS", _gasAdjustedTPSService.Instant(model));
                        break;
                    case TimeInterval.OneWeek:
                        TimeInterval nextInterval = TimeInterval.OneMonth;
                        result.LastData.Add("tps", Enumerable.Where(_tpsService.Get(model, nextInterval), x => x.Value.Any()).ToDictionary(x => x.Key, x => new List<DataPoint>() { new DataPoint() { Value = x.Value.TakeLast(7).Average(x => (x.Data.FirstOrDefault() == null) ? 0 : x.Data.FirstOrDefault().Value) } }));

                        result.LastData.Add("gps", Enumerable.Where(_gpsService.Get(model, nextInterval), x => x.Value.Any()).ToDictionary(x => x.Key, x => new List<DataPoint>() { new DataPoint() { Value = x.Value.TakeLast(7).Average(x => (x.Data.FirstOrDefault() == null) ? 0 : x.Data.FirstOrDefault().Value) } }));

                        result.LastData.Add("gasAdjustedTPS", Enumerable.Where(_gasAdjustedTPSService.Get(model, nextInterval), x => x.Value.Any()).ToDictionary(x => x.Key, x => new List<DataPoint>() { new DataPoint() { Value = x.Value.TakeLast(7).Average(x => (x.Data.FirstOrDefault() == null) ? 0 : x.Data.FirstOrDefault().Value) } }));
                        break;
                    default:
                        nextInterval = GetNextIntervalForInstantData(interval);
                        result.LastData.Add("tps", _tpsService.Get(model, nextInterval).ToDictionary(x => x.Key, x => new List<DataPoint>() { x.Value.LastOrDefault()?.Data.FirstOrDefault() }));
                        result.LastData.Add("gps", _gpsService.Get(model, nextInterval).ToDictionary(x => x.Key, x => new List<DataPoint>() { x.Value.LastOrDefault()?.Data.FirstOrDefault() }));
                        result.LastData.Add("gasAdjustedTPS", _gasAdjustedTPSService.Get(model, nextInterval).ToDictionary(x => x.Key, x => new List<DataPoint>() { x.Value.LastOrDefault()?.Data.FirstOrDefault() }));
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
            Dictionary<string, object> result = new();
            lock (Context.LockObj)
            {
                IDictionary<string, DataPoint> maxGPS = _gpsService.Max(model);
                result.Add("tps", _tpsService.Max(model));
                result.Add("gps", maxGPS);
                result.Add("gasAdjustedTPS", _gasAdjustedTPSService.Max(model));
            }
            return result;
        }

        /// <summary>
        /// Used for displaying chart buttons.
        /// </summary>

        public IEnumerable<TimeInterval> GetIntervalsWithData(ProviderQueryModel model)
        {
            List<TimeInterval> result = new();
            foreach (var interval in TimeIntervals())
            {
                try
                {
                    int count = _tpsService.Get(model, interval)[model.Provider].Count();
                    if (count > 1)
                    {
                        if (interval == TimeInterval.All && count < 12)
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
            IEnumerable<string> entries = _tpsService.Get(model, TimeInterval.All)[model.Provider]?.Select(x => x.Data.FirstOrDefault()?.Date.Year.ToString())?.OrderBy(x => x).Distinct();
            return entries;
        }

        public AllDataModel GetAllData(string network)
        {
            ProviderQueryModel allDataModel = new()
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
