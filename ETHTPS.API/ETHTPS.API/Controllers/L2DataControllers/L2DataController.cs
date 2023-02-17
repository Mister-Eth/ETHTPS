using ETHTPS.API.BIL.Infrastructure.Services.DataServices;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core;
using Microsoft.AspNetCore.Mvc;
using ETHTPS.API.Core.Controllers;

namespace ETHTPS.API.Controllers.L2DataControllers
{
    [Route("/api/v3/L2Data/[action]")]
    public class L2DataController : APIControllerBase
    {
        private readonly IAggregatedDataService _aggregatedDataService;
        private readonly IPSDataFormatter _dataFormatter;

        public L2DataController(IAggregatedDataService aggregatedDataService, IPSDataFormatter dataFormatter)
        {
            _aggregatedDataService = aggregatedDataService;
            _dataFormatter = dataFormatter;
        }

        /// <summary>
        /// Provides a catch-all endpoint for data requests. There are many ways requests can be customized; invalid parameters will
        /// </summary>
        /// <param name="requestModel"></param>
        /// <param name="dataType"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Get([FromBody] L2DataRequestModel requestModel, DataType dataType)
        {
            var validationResult = requestModel.Validate();
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Reason);
            }
            return Ok(_aggregatedDataService.GetData(requestModel, dataType, _dataFormatter));
        }
    }
}