using ETHTPS.API.Core.Integrations.MSSQL.Services;
using ETHTPS.Data;
using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Extensions.StringExtensions;
using ETHTPS.Data.Models.Pages.Chart;
using ETHTPS.Data.Models.Pages.HomePage;
using ETHTPS.Data.Models.Pages.ProviderPage;
using ETHTPS.Data.Models.Query;

using Microsoft.AspNetCore.Mvc;

using System.Linq;
using ETHTPS.API.BIL.Infrastructure.Services;

namespace ETHTPS.API.Controllers
{
    [Route("API/Pages/[action]")]
    public class PageModelController : ControllerBase
    {
        private readonly GeneralService _generalService;
        private readonly GasAdjustedTPSService _gasAdjustedTPSService;
        private readonly TPSService _tpsService;
        private readonly GPSService _gpsService;
        private readonly TimeWarpService _timeWarpService;

        public PageModelController(GeneralService generalService, GasAdjustedTPSService gasAdjustedTPSService, TPSService tpsService, GPSService gpsService, TimeWarpService timeWarpService)
        {
            _generalService = generalService;
            _gasAdjustedTPSService = gasAdjustedTPSService;
            _tpsService = tpsService;
            _gpsService = gpsService;
            _timeWarpService = timeWarpService;
        }

        [HttpGet]
        public HomePageResponseModel Home([FromQuery] HomePageRequestModel model) => new HomePageResponseModel()
        {
            ChartData = FromRequestModel(model),
            MaxData = _generalService.Max(ProviderQueryModel.All),
            InstantData = _generalService.InstantData(ProviderQueryModel.All),
            ColorDictionary = _generalService.ColorDictionary(),
            ProviderTypesColorDictionary = _generalService.ProviderTypesColorDictionary(),
            Providers = _generalService.Providers(model.SubchainsOf)
        };

        [HttpGet]
        public IActionResult Provider([FromQuery] ProviderPageRequestModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Provider) || model.Provider.LossyCompareTo(Constants.All) || !_generalService.Providers().Any(x => x.Name.LossyCompareTo(model.Provider)))
            {
                return BadRequest($"Invalid provider name \"{model.Provider}\"");
            }
            return Ok(new ProviderPageResponseModel()
            {
                ChartData = FromRequestModel(model),
                IntervalsWithData = _generalService.GetIntervalsWithData(model),
                UniqueDataYears = _generalService.GetUniqueDataYears(model)
            });
        }

        private ChartData FromRequestModel(RequestModelWithChartBase model) => new ChartData()
        {
            Data = GetServiceFor(model.DataType).Get(model, model.Interval),
            DataType = model.DataType
        };

        private IPSService GetServiceFor(DataType dataType) => dataType switch
        {
            DataType.TPS => _tpsService,
            DataType.GPS => _gpsService,
            _ => _gasAdjustedTPSService,
        };
    }
}
