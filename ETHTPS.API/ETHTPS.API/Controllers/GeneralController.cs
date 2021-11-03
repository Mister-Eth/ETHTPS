using ETHTPS.Data;
using ETHTPS.Data.Database;
using ETHTPS.Data.Database.Extensions;
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
    public class GeneralController : APIControllerBase
    {
        public GeneralController(ETHTPSContext context) : base(context)
        {
        }

        [HttpGet]
        public IEnumerable<string> Networks()
        {
            return Context.Networks.Select(x => x.Name);
        }

        [HttpGet]
        public IEnumerable<string> Intervals() => TimeIntervals();


        [HttpGet]
        public IEnumerable<ProviderResponseModel> Providers()
        {
            return Context.Providers.ToList().Select(x => new ProviderResponseModel()
            {
                Name = x.Name,
                Type = x.TypeNavigation.Name,
                Color = x.ProviderProperties.First(x => x.Name == "Color").Value
            });
        }

        /*
        [HttpGet]
        public async Task<HomePageViewModel> HomePageModelAsync(string network = "Mainnet")
        {
            return new HomePageViewModel()
            {
                InstantTPS = await InstantTPSAsync(),
                ColorDictionary = _context.Providers.ToDictionary(x => x.Name, x => x.Color),
                ProviderData = _context.Providers.Select(x => new ProviderInfo()
                {
                    Name = x.Name,
                    MaxTPS = MaxTPS(x.Name).FirstOrDefault().Data.FirstOrDefault().TPS,
                    Type = x.Type
                }),
                //TPSData = await BuildTPSDataAsync(network)
            };
        }
        */
    }
}
