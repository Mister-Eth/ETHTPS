using Microsoft.AspNetCore.Mvc;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.ResponseModels.L2s;

namespace ETHTPS.API.Controllers.L2DataControllers
{
    [Route("/api/v3/L2Data/[action]")]
    public class L2DataController
    {
        private readonly IAggregatedDataService _aggregatedDataService;
        private readonly IPSDataFormatter _dataFormatter;

        public L2DataController(IAggregatedDataService aggregatedDataService, IPSDataFormatter dataFormatter)
        {
            _aggregatedDataService = aggregatedDataService;
            _dataFormatter = dataFormatter;
        }

        [HttpPost]
        public L2DataResponseModel Get([FromBody] DataRequestModel requestModel, DataType dataType)
        {
            return _aggregatedDataService.GetData(requestModel, dataType, _dataFormatter);
        }
    }
}