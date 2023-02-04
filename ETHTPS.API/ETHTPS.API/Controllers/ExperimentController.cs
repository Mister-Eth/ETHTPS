using ETHTPS.API.Core.Infrastructure.Services.Experimentation;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace ETHTPS.API.General.Controllers
{
    [Route("api/beta/experiments")]
    [ApiController]
    public class ExperimentController : ControllerBase
    {
        private readonly IExperimentService _experimentService;

        public ExperimentController(IExperimentService experimentService)
        {
            _experimentService = experimentService;
        }

        [HttpGet("AvailableExperiments")]
        public async Task<IEnumerable<int>> GetAvailableExperiments([FromQuery] ExperimentRequesterParameters parameters)
        {
            return await _experimentService.GetAvailableExperimentsAsync(parameters, HttpContext);
        }
    }
}
