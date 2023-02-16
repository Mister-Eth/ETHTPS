using ETHTPS.API.Core.Integrations.MSSQL.Services;
using ETHTPS.Data.Core.Models;
using ETHTPS.Data.ResponseModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ETHTPS.Data.Core.Models.DataPoints;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core;

namespace ETHTPS.API.Controllers.L2DataControllers
{
    [Route("api/v2/[action]")]
    public class GeneralController
    {
        private readonly GeneralService _generalService;

        public GeneralController(GeneralService generalService)
        {
            _generalService = generalService;
        }

        [HttpGet]
        public IEnumerable<string> Networks()
        {
            return _generalService.Networks();
        }

        [HttpGet]
        public IEnumerable<TimeInterval> Intervals()
        {
            return _generalService.Intervals();
        }


        [HttpGet]
        public IEnumerable<ProviderResponseModel> Providers(string subchainsOf)
        {
            if (!string.IsNullOrWhiteSpace(subchainsOf))
                return _generalService.Providers(subchainsOf);

            return _generalService.Providers();
        }

        [HttpGet]
        public IDictionary<string, string> ColorDictionary()
        {
            return _generalService.ColorDictionary();
        }

        [HttpGet]
        public IDictionary<string, string> ProviderTypesColorDictionary()
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
        public IEnumerable<TimeInterval> GetIntervalsWithData([FromQuery] ProviderQueryModel model)
        {
            return _generalService.GetIntervalsWithData(model);
        }

        [HttpGet]
        public IEnumerable<string> GetUniqueDataYears([FromQuery] ProviderQueryModel model)
        {
            return _generalService.GetUniqueDataYears(model);
        }

        [HttpGet]
        public AllDataModel AllData(string network = "Mainnet")
        {
            return _generalService.GetAllData(network);
        }
    }
}