using ETHTPS.API.BIL.Infrastructure.Services.DataServices.GPS;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.GTPS;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.TPS;
using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.DataPoints.XYPoints;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.DataPoints;

using Microsoft.Extensions.Logging;
using ETHTPS.Data.Core.Models.ResponseModels.L2s;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataServices
{
    public class DependencyInjectionAggregatedDataservice : IAggregatedDataService
    {
        private readonly ITPSService _tpsService;
        private readonly IGPSService _gpsService;
        private readonly IGTPSService _gtpsService;
        private readonly ILogger<DependencyInjectionAggregatedDataservice>? _logger;

        public DependencyInjectionAggregatedDataservice(ITPSService tpsService, IGPSService gpsService, IGTPSService gtpsService, ILogger<DependencyInjectionAggregatedDataservice>? logger)
        {
            _tpsService = tpsService;
            _gpsService = gpsService;
            _gtpsService = gtpsService;
            _logger = logger;
        }

        public List<DataResponseModel> GetData(L2DataRequestModel requestModel, DataType dataType, TimeInterval interval)
        {
            return dataType switch
            {
                DataType.TPS => GetTPS(requestModel, interval),
                DataType.GPS => GetGPS(requestModel, interval),
                DataType.GasAdjustedTPS => GetGTPS(requestModel, interval),
                _ => throw new ArgumentException($"{dataType} is not supported."),
            };
        }

        public L2DataResponseModel GetData(L2DataRequestModel requestModel, DataType dataType, IPSDataFormatter formatter)
        {
            return new L2DataResponseModel()
            {
                DataType = dataType,
                Datasets = requestModel.Providers.ToArray().Select(providerName =>
                {
                    requestModel.Provider = providerName;
                    return new Dataset(formatter.Format(GetData(requestModel, dataType, requestModel.AutoInterval), requestModel), providerName, requestModel.IncludeBasicAnalysis, requestModel.IncludeComplexAnalysis);
                })
            };
        }

        public List<DataResponseModel> GetGPS(ProviderQueryModel requestModel, TimeInterval interval)
        {
            return _gpsService.GetGPS(requestModel, interval);
        }

        public List<DataResponseModel> GetGTPS(ProviderQueryModel requestModel, TimeInterval interval)
        {
            return _gtpsService.GetGTPS(requestModel, interval);
        }

        public List<DataResponseModel> GetTPS(ProviderQueryModel requestModel, TimeInterval interval)
        {
            return _tpsService.GetTPS(requestModel, interval);
        }
    }
}
