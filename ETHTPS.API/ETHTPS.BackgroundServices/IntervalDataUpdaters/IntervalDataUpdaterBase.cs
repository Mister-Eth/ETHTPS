using ETHTPS.API.Infrastructure;
using ETHTPS.Data;
using ETHTPS.Data.Database;
using ETHTPS.Data.Extensions.StringExtensions;
using ETHTPS.Data.ResponseModels;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ETHTPS.BackgroundServices.IntervalDataUpdaters
{
    public abstract class IntervalDataUpdaterBase : IHostedService, IDisposable
    {
        private readonly ILogger<IntervalDataUpdaterBase> _logger;
        private Timer timer;
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly string _interval;
        private readonly TimeSpan _updateEvery;

        public IntervalDataUpdaterBase(ILogger<IntervalDataUpdaterBase> logger, IServiceScopeFactory serviceScopeFactory, string interval, TimeSpan updateEvery)
        {
            _logger = logger;
            _scopeFactory = serviceScopeFactory;
            _interval = interval;
            _updateEvery = updateEvery;
        }

        public void Dispose()
        {
            timer?.Dispose();
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            timer = new Timer(o => {
                using(var scope = _scopeFactory.CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<ETHTPSContext>();
                    var timeInterval = Enum.Parse<TimeInterval>(_interval);
                    foreach (var provider in context.Providers.Select(x => x.Name).ToArray())
                    {
                        try
                        {
                            _logger.LogInformation($"Updating {provider}-{_interval}");
                            var result = default(IEnumerable<TPSResponseModel>);
                            if (timeInterval == TimeInterval.Latest)
                            {
                                result = (GetData(context, TimeInterval.OneHour, provider)).Take(100).Select(x => new TPSResponseModel()
                                {
                                    Date = x.Date.Value,
                                    TPS = x.Tps.Value
                                }).ToList();
                            }
                            else if (timeInterval == TimeInterval.Instant)
                            {
                                result = (GetData(context, TimeInterval.Instant, provider)).Select(x => new TPSResponseModel()
                                {
                                    Date = x.Date.Value,
                                    TPS = x.Tps.Value,
                                    Provider = context.Providers.First(y => y.Id == x.Provider).Name
                                }).ToList();
                            }
                            else if (timeInterval == TimeInterval.OneHour)
                            {
                                var groups = (GetData(context, TimeInterval.OneHour, provider)).GroupBy(x => x.Date.Value.Minute);
                                var list = new List<TPSResponseModel>();
                                foreach (var group in groups)
                                {
                                    list.Add(new TPSResponseModel()
                                    {
                                        Date = group.First().Date.Value.Subtract(TimeSpan.FromSeconds(group.First().Date.Value.Second)).Subtract(TimeSpan.FromMilliseconds(group.First().Date.Value.Millisecond)).Subtract(TimeSpan.FromMilliseconds(group.First().Date.Value.Millisecond)),
                                        TPS = group.Average(x => x.Tps.Value)
                                    });
                                }
                                result = list;
                            }
                            else if (timeInterval == TimeInterval.OneDay)
                            {
                                var groups = (GetData(context, TimeInterval.OneDay, provider)).GroupBy(x => x.Date.Value.Hour);
                                var list = new List<TPSResponseModel>();
                                foreach (var group in groups)
                                {
                                    list.Add(new TPSResponseModel()
                                    {
                                        Date = group.First().Date.Value.Subtract(TimeSpan.FromSeconds(group.First().Date.Value.Second)).Subtract(TimeSpan.FromMilliseconds(group.First().Date.Value.Millisecond)).Subtract(TimeSpan.FromMinutes(group.First().Date.Value.Minute)),
                                        TPS = group.Average(x => x.Tps.Value)
                                    });
                                }
                                result = list;
                            }
                            else if (timeInterval == TimeInterval.OneWeek)
                            {
                                var groups = (GetData(context, TimeInterval.OneWeek, provider)).GroupBy(x => x.Date.Value.Day * 100 + x.Date.Value.Hour);
                                var list = new List<TPSResponseModel>();
                                foreach (var group in groups)
                                {
                                    list.Add(new TPSResponseModel()
                                    {
                                        Date = group.First().Date.Value.Subtract(TimeSpan.FromSeconds(group.First().Date.Value.Second)).Subtract(TimeSpan.FromMilliseconds(group.First().Date.Value.Millisecond)).Subtract(TimeSpan.FromMinutes(group.First().Date.Value.Minute)),
                                        TPS = group.Average(x => x.Tps.Value)
                                    });
                                }
                                result = list;
                            }
                            else if (timeInterval == TimeInterval.OneMonth)
                            {
                                var groups = (GetData(context, TimeInterval.OneMonth, provider)).GroupBy(x => x.Date.Value.Day * 10000 + x.Date.Value.Month * 100 + x.Date.Value.Hour);
                                var list = new List<TPSResponseModel>();
                                foreach (var group in groups)
                                {
                                    list.Add(new TPSResponseModel()
                                    {
                                        Date = group.First().Date.Value.Subtract(TimeSpan.FromSeconds(group.First().Date.Value.Second)).Subtract(TimeSpan.FromMilliseconds(group.First().Date.Value.Millisecond)).Subtract(TimeSpan.FromMinutes(group.First().Date.Value.Minute)),
                                        TPS = group.Average(x => x.Tps.Value)
                                    });
                                }
                                result = list;
                            }

                            var name = StringExtensions.AggregateToLowercase(provider, _interval);
                            if (timeInterval == TimeInterval.Instant)
                            {
                                name = StringExtensions.AggregateToLowercase("Any", _interval);
                            }
                            if (!context.CachedResponses.Any(x => x.Name == name))
                            {
                                context.CachedResponses.Add(new CachedResponse()
                                {
                                    Name = name,
                                    Json = JsonConvert.SerializeObject(result)
                                });
                                context.SaveChanges();
                            }

                            var entry = context.CachedResponses.First(x => x.Name == name);
                            entry.Json = JsonConvert.SerializeObject(result);
                            context.Update(entry);
                            context.SaveChanges();

                            if (timeInterval == TimeInterval.Instant)
                            {
                                break;
                            }
                        }
                        catch (Exception e)
                        {
                            _logger.LogError(e, $"{provider}-{_interval}");
                        }
                    }
                }
            },
            null,
            TimeSpan.Zero,
            _updateEvery);
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        private IEnumerable<TPSData> GetData(ETHTPSContext context, TimeInterval interval, string provider)
        {
            var targetProvider = context.Providers.First(x => x.Name.ToUpper() == provider.ToUpper());
            switch (interval)
            {
                case TimeInterval.Latest:
                    return context.Tpsdata.AsEnumerable().Where(x => x.Provider.Value == targetProvider.Id && x.Date >= DateTime.Now.Subtract(TimeSpan.FromMinutes(1))).OrderBy(x => x.Date);
                case TimeInterval.OneHour:
                    return context.Tpsdata.AsEnumerable().Where(x => x.Provider.Value == targetProvider.Id && x.Date >= DateTime.Now.Subtract(TimeSpan.FromHours(1))).OrderBy(x => x.Date);
                case TimeInterval.OneDay:
                    return context.Tpsdata.AsEnumerable().Where(x => x.Provider.Value == targetProvider.Id && x.Date >= DateTime.Now.Subtract(TimeSpan.FromDays(1))).OrderBy(x => x.Date);
                case TimeInterval.OneWeek:
                    return context.Tpsdata.AsEnumerable().Where(x => x.Provider.Value == targetProvider.Id && x.Date >= DateTime.Now.Subtract(TimeSpan.FromDays(7))).OrderBy(x => x.Date);
                case TimeInterval.OneMonth:
                    return context.Tpsdata.AsEnumerable().Where(x => x.Provider.Value == targetProvider.Id && x.Date >= DateTime.Now.Subtract(TimeSpan.FromDays(30))).OrderBy(x => x.Date);
                case TimeInterval.Instant:
                    return context.Tpsdata.OrderByDescending(x => x.Date).AsEnumerable().GroupBy(x => x.Provider).Select(x => x.First());
                default:
                    return null;
            }
        }
    }
}
