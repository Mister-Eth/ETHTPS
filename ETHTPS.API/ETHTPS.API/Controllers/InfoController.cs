﻿using ETHTPS.API.Core.Infrastructure.Services.Info;
using Microsoft.AspNetCore.Components;

namespace ETHTPS.API.Controllers
{
    [Route("api/info/[action]")]
    public class InfoController : APIControllerBase
    {
        private readonly IInfoService _infoService;

        public InfoController(IInfoService infoService)
        {
            _infoService = infoService;
        }


    }
}
