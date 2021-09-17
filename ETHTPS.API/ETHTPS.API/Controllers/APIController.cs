using ETHTPS.API.Infrastructure.Database.Models;
using ETHTPS.API.Infrastructure.TPSProviders;
using ETHTPS.API.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Controllers
{
    [Route("API/[action]")]
    public class APIController : ControllerBase
    {
        private readonly ETHTPSContext _context;
        private readonly IServiceProvider _services;

        public APIController(ETHTPSContext context, IServiceProvider services)
        {
            _context = context;
            _services = services;
        }

        [HttpGet]
        public IEnumerable<Provider> Providers()
        {
            return _context.Providers;
        }

        [HttpGet]
        public IEnumerable<ProviderType> ProviderTypes()
        {
            return _context.ProviderTypes;
        }

        [HttpGet]
        public IEnumerable<string> Intervals()
        {
            foreach(var interval in Enum.GetValues(typeof(TimeInterval)))
            {
                yield return interval.ToString();
            }
        }

        [HttpGet]
        public async Task<IEnumerable<TPSResponseModel>> GetTPS(string provider, string interval)
        {
            var tpsProviderTypes = _services.GetServices<ITPSProvider>();
            var targetProvider = tpsProviderTypes.FirstOrDefault(x => x.Name.ToUpper() == provider.ToUpper());
            if (targetProvider != null)
            {
                return await targetProvider.GetTPSAsync(Enum.Parse<TimeInterval>(interval));
            }
            else
            {
                return new TPSResponseModel[] { };
            }
        }
    }
}
