using Microsoft.AspNetCore.Mvc;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.ResponseModels.L2s;

namespace ETHTPS.API.Controllers.L2DataControllers
{
    [Route("API/v2/[action]")]
    public class L2DataController
    {
        private readonly IAggregatedDataService _aggregatedDataService;
        private readonly IPSDataFormatter _dataFormatter;

        public L2DataController(IAggregatedDataService aggregatedDataService)
        {
            _aggregatedDataService = aggregatedDataService;
        }

        [HttpGet]
        public L2DataResponseModel Get([FromQuery] DataRequestModel requestModel, DataType dataType)
        {
            return _aggregatedDataService.GetData(requestModel, dataType, _dataFormatter);
        }
    }
}