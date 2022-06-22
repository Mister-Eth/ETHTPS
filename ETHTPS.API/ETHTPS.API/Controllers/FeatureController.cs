using ETHTPS.Services.PSServices;
using ETHTPS.Services.PSServices.Implementations;
using ETHTPS.Data.Database;
using ETHTPS.Data.Models.Query;
using ETHTPS.Services.BlockchainServices.Status;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Controllers
{
    [Route("api/Status/[action]")]
    public class FeatureController : ControllerBase
    {
        private readonly FeatureService _featureService;

        public FeatureController(FeatureService featureService)
        {
            _featureService = featureService;
        }

        [HttpGet]
        public IActionResult GetFeatures([FromQuery]FeatureQueryModel model)
        {
            try
            {
                return Ok(((IFeatureService)_featureService).GetFeatures(model));
            }
            catch(ArgumentNullException ex)
            {
                return BadRequest(ex.ParamName);
            }
            catch(ArgumentException)
            {
                return NotFound();
            }
        }
        [HttpGet]
        public IActionResult IsFeatureEnabled([FromQuery]FeatureQueryModel model)
        {
            try
            {
                return Ok(((IFeatureService)_featureService).IsFeatureEnabled(model));
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(ex.ParamName);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
