using ETHTPS.API.Infrastructure;
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
        private static ResponseCacher<(string Provider, string Interval), IEnumerable<TPSResponseModel>> _tpsResponseCacher = new ResponseCacher<(string Provider, string Interval), IEnumerable<TPSResponseModel>>(300); //Use cache for TPS tasks because they are resource intensive
        public APIController(ETHTPSContext context)
        {
            _context = context;
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
            return await _tpsResponseCacher.ExecuteOrGetCachedValueAsync((provider, interval), Task.Run(async() => 
            {
                var timeInterval = Enum.Parse<TimeInterval>(interval);
                if (timeInterval == TimeInterval.Latest)
                {
                    return (await GetDataAsync(TimeInterval.OneHour, provider)).Take(100).Select(x => new TPSResponseModel()
                    {
                        Date = x.Date.Value,
                        TPS = x.Tps.Value
                    });
                }
                else if (timeInterval == TimeInterval.OneHour)
                {
                    var groups = (await GetDataAsync(TimeInterval.OneHour, provider)).GroupBy(x => x.Date.Value.Minute);
                    var list = new List<TPSResponseModel>();
                    foreach (var group in groups)
                    {
                        list.Add(new TPSResponseModel()
                        {
                            Date = group.First().Date.Value.Subtract(TimeSpan.FromSeconds(group.First().Date.Value.Second)).Subtract(TimeSpan.FromMilliseconds(group.First().Date.Value.Millisecond)).Subtract(TimeSpan.FromMilliseconds(group.First().Date.Value.Millisecond)),
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
                            Date = group.First().Date.Value.Subtract(TimeSpan.FromSeconds(group.First().Date.Value.Second)).Subtract(TimeSpan.FromMilliseconds(group.First().Date.Value.Millisecond)).Subtract(TimeSpan.FromMinutes(group.First().Date.Value.Minute)),
                            TPS = group.Average(x => x.Tps.Value)
                        });
                    }
                    return list;
                }
                else if (timeInterval == TimeInterval.OneWeek)
                {
                    var groups = (await GetDataAsync(TimeInterval.OneWeek, provider)).GroupBy(x => x.Date.Value.Hour);
                    var list = new List<TPSResponseModel>();
                    foreach (var group in groups)
                    {
                        list.Add(new TPSResponseModel()
                        {
                            Date = group.First().Date.Value.Subtract(TimeSpan.FromSeconds(group.First().Date.Value.Second)).Subtract(TimeSpan.FromMilliseconds(group.First().Date.Value.Millisecond)).Subtract(TimeSpan.FromMinutes(group.First().Date.Value.Minute)),
                            TPS = group.Average(x => x.Tps.Value)
                        });
                    }
                    return list;
                }
                else if (timeInterval == TimeInterval.Instant)
                {
                    return (await GetDataAsync(TimeInterval.Instant, provider)).Select(x => new TPSResponseModel()
                    {
                        Date = x.Date.Value,
                        TPS = x.Tps.Value,
                        Provider = _context.Providers.First(y => y.Id == x.Provider).Name
                    });
                }
                return new TPSResponseModel[] { };
            }));
        }

        private async Task<IEnumerable<TPSData>> GetDataAsync(TimeInterval interval, string provider)
        {
            var targetProvider = _context.Providers.First(x => x.Name.ToUpper() == provider.ToUpper());
            switch (interval)
            {
                case TimeInterval.Latest:
                    return _context.Tpsdata.AsEnumerable().Where(x => x.Provider.Value == targetProvider.Id && x.Date >= DateTime.Now.Subtract(TimeSpan.FromMinutes(1)));
                case TimeInterval.OneHour:
                    return _context.Tpsdata.AsEnumerable().Where(x => x.Provider.Value == targetProvider.Id && x.Date >= DateTime.Now.Subtract(TimeSpan.FromHours(1)));
                case TimeInterval.OneDay:
                    return _context.Tpsdata.AsEnumerable().Where(x => x.Provider.Value == targetProvider.Id && x.Date >= DateTime.Now.Subtract(TimeSpan.FromDays(1)));
                case TimeInterval.OneWeek:
                    return _context.Tpsdata.AsEnumerable().Where(x => x.Provider.Value == targetProvider.Id && x.Date >= DateTime.Now.Subtract(TimeSpan.FromDays(7)));
                case TimeInterval.Instant:
                    return _context.Tpsdata.OrderByDescending(x => x.Date).AsEnumerable().GroupBy(x => x.Provider).Select(x => x.First());
                default:
                    return null;
            }
        }
    }

    public enum TimeInterval { Instant, Latest, OneHour, OneDay, OneWeek }
}
