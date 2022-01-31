using ETHTPS.API.Infrastructure.Services.Implementations;
using ETHTPS.Data;
using ETHTPS.Data.Database;
using ETHTPS.Data.Database.Extensions;
using ETHTPS.Data.Database.HistoricalDataProviders;
using ETHTPS.Data.ResponseModels;
using ETHTPS.Data.ResponseModels.HomePage;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        public IEnumerable<string> Networks()
        {
            return _generalService.Networks();
        }

        [HttpGet]
        public IEnumerable<string> Intervals()
        {
            return _generalService.Intervals();
        }


        [HttpGet]
        public IEnumerable<ProviderResponseModel> Providers()
        {
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
        public IDictionary<string, object> InstantData(bool includeSidechains = true, string network = "Mainnet", string smoothing = "")
        {
            return _generalService.InstantData(includeSidechains, network, smoothing);
        }

        [HttpGet]
        public IDictionary<string, object> Max(string provider, string network = "Mainnet")
        {
            return _generalService.Max(provider, network);
        }

        /// <summary>
        /// Used for displaying chart buttons.
        /// </summary>
        [HttpGet]
        public IEnumerable<string> GetIntervalsWithData(string provider, string network = "Mainnet")
        {
            return _generalService.GetIntervalsWithData(provider, network);
        }

        [HttpGet]
        public IEnumerable<string> GetUniqueDataYears(string provider, string network = "Mainnet")
        {
            return _generalService.GetUniqueDataYears(provider, network);
        }

        [HttpGet]
        public AllDataModel AllData(string network = "Mainnet")
        {
            return _generalService.GetAllData(network);
        }
    }
}
