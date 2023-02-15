using ETHTPS.API.BIL.Infrastructure.Services.DataServices.GPS;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.GTPS;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.TPS;
using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.Queries.Responses;

using Microsoft.Extensions.Logging;

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

        public DataResponseModel GetData(DataRequestModel requestModel, DataType dataType)
        {
            throw new NotImplementedException();
        }

        public DataResponseModel GetGPS(DataRequestModel requestModel)
        {
            return _gpsService.GetGPS(requestModel);
        }

        public DataResponseModel GetGTPS(DataRequestModel requestModel)
        {
            return _gtpsService.GetGTPS(requestModel);
        }

        public DataResponseModel GetTPS(DataRequestModel requestModel)
        {
            return _tpsService.GetTPS(requestModel);
        }
    }
}
