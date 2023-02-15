using ETHTPS.API.Core.Integrations.MSSQL.Services;
using ETHTPS.Data.Core.Models;
using ETHTPS.Data.ResponseModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ETHTPS.Data.Core.Models.ResponseModels.DataPoints;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;

namespace ETHTPS.API.Controllers
{
    [Route("API/v2/[action]")]
    public class GeneralController
    {
        private readonly GeneralService _generalService;

        public GeneralController(GeneralService generalService)
        {
            _generalService = generalService;
        }

        [HttpGet]
        public IEnumerable<string> Networks([FromQuery] APIKeyRequestModel model)
        {
            return _generalService.Networks();
        }

        [HttpGet]
        public IEnumerable<string> Intervals([FromQuery] APIKeyRequestModel model)
        {
            return _generalService.Intervals();
        }


        [HttpGet]
        public IEnumerable<ProviderResponseModel> Providers([FromQuery] APIKeyRequestModel model, string subchainsOf)
        {
            if (!string.IsNullOrWhiteSpace(subchainsOf))
                return _generalService.Providers(subchainsOf);

            return _generalService.Providers();
        }

        [HttpGet]
        public IDictionary<string, string> ColorDictionary([FromQuery] APIKeyRequestModel model)
        {
            return _generalService.ColorDictionary();
        }

        [HttpGet]
        public IDictionary<string, string> ProviderTypesColorDictionary([FromQuery] APIKeyRequestModel model)
        {
            return _generalService.ProviderTypesColorDictionary();
        }

        [HttpGet]
        public IDictionary<string, object> InstantData([FromQuery] ProviderQueryModel model, string smoothing = "")
        {
            return _generalService.InstantData(model, smoothing);
        }

        [HttpGet]
        public IDictionary<string, object> Max([FromQuery] ProviderQueryModel model)
        {
            return _generalService.Max(model);
        }   /// <summary>
            /// Used for displaying chart buttons.
            /// </summary>
        [HttpGet]
        public IEnumerable<string> GetIntervalsWithData([FromQuery] ProviderQueryModel model)
        {
            return _generalService.GetIntervalsWithData(model);
        }

        [HttpGet]
        public IEnumerable<string> GetUniqueDataYears([FromQuery] ProviderQueryModel model)
        {
            return _generalService.GetUniqueDataYears(model);
        }

        [HttpGet]
        public AllDataModel AllData([FromQuery] APIKeyRequestModel model, string network = "Mainnet")
        {
            return _generalService.GetAllData(network);
        }
    }
}