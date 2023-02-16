using ETHTPS.API.BIL.Infrastructure.Services;
using ETHTPS.API.Core.Controllers;

using Microsoft.AspNetCore.Components;

namespace ETHTPS.API.Controllers
{
    [Route("/api/v3/info/[action]")]
    public class InfoController : APIControllerBase
    {
        private readonly IInfoService _infoService;

        public InfoController(IInfoService infoService)
        {
            _infoService = infoService;
        }


    }
}
