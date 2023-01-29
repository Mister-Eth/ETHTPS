using ETHTPS.API.Infrastructure.Services.Experimentation;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;

namespace ETHTPS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExperimentController : ControllerBase
    {
        private readonly IExperimentService _experimentService;

        public ExperimentController(IExperimentService experimentService)
        {
            _experimentService = experimentService;
        }

        [HttpGet]
        public IEnumerable<int> GetAvailableExperiments([FromQuery] ExperimentRequesterParameters parameters)
        {
            return _experimentService.GetAvailableExperiments(parameters);
        }
    }
}
