using ETHTPS.API.Infrastructure.Database.Models;
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
            var timeInterval = Enum.Parse<TimeInterval>(interval);
            if(timeInterval == TimeInterval.OneMinute)
            {
                return (await GetDataAsync(TimeInterval.OneHour, provider)).Select(x => new TPSResponseModel()
                {
                    Date = x.Date.Value,
                    Provider = provider,
                    TPS = x.Tps.Value
                });
            }
            else if (timeInterval == TimeInterval.OneHour)
            {
                var groups = (await GetDataAsync(TimeInterval.OneHour, provider)).GroupBy(x => x.Date.Value.Minute);
                var list = new List<TPSResponseModel>();
                foreach(var group in groups)
                {
                    list.Add(new TPSResponseModel()
                    {
                        Date = group.First().Date.Value,
                        Provider = provider,
                        TPS = group.Average(x => x.Tps.Value)
                    });
                }
                return list;
            }
            else if (timeInterval == TimeInterval.OneDay)
            {
                var groups = (await GetDataAsync(TimeInterval.OneDay, provider)).GroupBy(x => x.Date.Value.Hour);
                var list = new List<TPSResponseModel>();
                foreach (var group in groups)
                {
                    list.Add(new TPSResponseModel()
                    {
                        Date = group.First().Date.Value,
                        Provider = provider,
                        TPS = group.Average(x => x.Tps.Value)
                    });
                }
                return list;
            }
            return new TPSResponseModel[] { };
        }

        private async Task<IEnumerable<TPSData>> GetDataAsync(TimeInterval interval, string provider)
        {
            var targetProvider = _context.Providers.First(x => x.Name.ToUpper() == provider.ToUpper());
            switch (interval)
            {
                case TimeInterval.OneMinute:
                    return _context.Tpsdata.AsEnumerable().Where(x => x.Provider.Value == targetProvider.Id && x.Date >= DateTime.Now.Subtract(TimeSpan.FromMinutes(1)));
                case TimeInterval.OneHour:
                    return _context.Tpsdata.AsEnumerable().Where(x => x.Provider.Value == targetProvider.Id && x.Date >= DateTime.Now.Subtract(TimeSpan.FromHours(1)));
                case TimeInterval.OneDay:
                    return _context.Tpsdata.AsEnumerable().Where(x => x.Provider.Value == targetProvider.Id && x.Date >= DateTime.Now.Subtract(TimeSpan.FromDays(1)));
                default:
                    return null;
            }
        }
    }

    public enum TimeInterval { OneMinute, OneHour, OneDay }
}
