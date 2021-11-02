using ETHTPS.BackgroundServices.Infrastructure.Performance.Tasks.Extensions;
using ETHTPS.Data.Database;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ETHTPS.BackgroundServices.TPSDataUpdaters
{
    public abstract class TPSDataUpdaterBase : HangfireBackgroundService
    {
        protected TPSDataUpdaterBase(string name, ILogger<HangfireBackgroundService> logger, ETHTPSContext context) : base(name, logger, context)
        {
        }

        public abstract Task<Tpsdatum> GetDataAsync();

        public override async Task RunAsync()
        {
            try
            {
                var data = await GetDataAsync();
                if (data != null)
                {
                    if (data.Network.GetValueOrDefault() == 0)
                    {
                        data.Network = 1;
                    }

                    AddEntry(data);
                    RegisterLatestEntry(data);
                    UpdateMaxTpsentry(data);

                    AddOrUpdateHourTPSEntry(data);
                    AddOrUpdateDayTPSEntry(data);
                    AddOrUpdateWeekTPSEntry(data);
                    AddOrUpdateMonthTPSEntry(data);

                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"{Name} TPSDataUpdaterBase", e);
            }
        }

        public void AddEntry(Tpsdatum entry)
        {
            _context.Tpsdata.Add(entry);
            _context.SaveChanges();
            _logger.LogInformation($"{Name}: {entry.Tps}TPS");
        }

        public void RegisterLatestEntry(Tpsdatum entry)
        {
            if (!_context.LatestEntries.Any(x => x.Provider == entry.Provider))
            {
                _context.LatestEntries.Add(new LatestEntry()
                {
                    Entry = entry.Id,
                    Provider = entry.Provider
                });
            }
            else
            {
                var targetEntry = _context.LatestEntries.First(x => x.Provider == entry.Provider);
                targetEntry.Entry = entry.Id;
                _context.LatestEntries.Update(targetEntry);
            }
        }

        public void UpdateMaxTpsentry(Tpsdatum entry)
        {
            if (!_context.MaxTpsentries.Any(x => x.Provider == entry.Provider))
            {
                _context.MaxTpsentries.Add(new MaxTpsentry()
                {
                    Entry = entry.Id,
                    Provider = entry.Provider
                });
            }
            else
            {
                var targetEntry = _context.MaxTpsentries.First(x => x.Provider == entry.Provider);
                if (entry.Tps > _context.Tpsdata.First(x => x.Id == targetEntry.Entry).Tps)
                {
                    targetEntry.Entry = entry.Id;
                    _context.MaxTpsentries.Update(targetEntry);
                }
            }
        }

        public void AddOrUpdateHourTPSEntry(Tpsdatum entry)
        {
            var targetDate = entry.Date.Value
                .Subtract(TimeSpan.FromSeconds(entry.Date.Value.Second))
                .Subtract(TimeSpan.FromMilliseconds(entry.Date.Value.Millisecond));
            Func<TpsdataHour, bool> selector = x => x.Network == entry.Network && x.Provider == entry.Provider && x.StartDate.Value.Minute == targetDate.Minute;
            if (!_context.TpsdataHours.Any(selector))
            {
                _context.TpsdataHours.Add(new TpsdataHour()
                {
                    Network = entry.Network,
                    AverageTps = entry.Tps,
                    Provider = entry.Provider,
                    StartDate = targetDate,
                    ReadingsCount = 1
                });
            }
            else
            {
                var x = _context.TpsdataHours.First(selector);
                if (x.StartDate.Value.Hour == targetDate.Hour)
                {
                    x.AverageTps = ((x.AverageTps * x.ReadingsCount) + entry.Tps) / ++x.ReadingsCount;
                }
                else
                {
                    x.AverageTps = entry.Tps;
                    x.ReadingsCount = 1;
                    x.StartDate = entry.Date;
                }
                _context.TpsdataHours.Update(x);
            }
        }

        public void AddOrUpdateDayTPSEntry(Tpsdatum entry)
        {
            var targetDate = entry.Date.Value
                .Subtract(TimeSpan.FromSeconds(entry.Date.Value.Second))
                .Subtract(TimeSpan.FromMilliseconds(entry.Date.Value.Millisecond))
                .Subtract(TimeSpan.FromMinutes(entry.Date.Value.Minute));
            Func<TpsdataDay, bool> selector = x => x.Network == entry.Network && x.Provider == entry.Provider && x.StartDate.Value.Hour == targetDate.Hour;
            if (!_context.TpsdataDays.Any(selector))
            {
                _context.TpsdataDays.Add(new TpsdataDay()
                {
                    Network = entry.Network,
                    AverageTps = entry.Tps,
                    Provider = entry.Provider,
                    StartDate = targetDate,
                    ReadingsCount = 1
                });
            }
            else
            {
                var x = _context.TpsdataDays.First(selector);
                if (x.StartDate.Value.Day == targetDate.Day)
                {
                    x.AverageTps = ((x.AverageTps * x.ReadingsCount) + entry.Tps) / ++x.ReadingsCount;
                }
                else
                {
                    x.AverageTps = entry.Tps;
                    x.ReadingsCount = 1;
                    x.StartDate = entry.Date;
                }
                _context.TpsdataDays.Update(x);
            }
        }

        public void AddOrUpdateWeekTPSEntry(Tpsdatum entry)
        {
            var targetDate = entry.Date.Value
                .Subtract(TimeSpan.FromSeconds(entry.Date.Value.Second))
                .Subtract(TimeSpan.FromMilliseconds(entry.Date.Value.Millisecond))
                .Subtract(TimeSpan.FromMinutes(entry.Date.Value.Minute));
            Func<TpsdataWeek, bool> selector = x => x.Network == entry.Network && x.Provider == entry.Provider && x.StartDate.Value.Hour == targetDate.Hour && x.StartDate.Value.DayOfWeek == targetDate.DayOfWeek;
            if (!_context.TpsdataWeeks.Any(selector))
            {
                _context.TpsdataWeeks.Add(new TpsdataWeek()
                {
                    Network = entry.Network,
                    AverageTps = entry.Tps,
                    Provider = entry.Provider,
                    StartDate = targetDate,
                    ReadingsCount = 1
                });
            }
            else
            {
                var x = _context.TpsdataWeeks.First(selector);
                if (x.StartDate.Value.Day == targetDate.Day)
                {
                    x.AverageTps = ((x.AverageTps * x.ReadingsCount) + entry.Tps) / ++x.ReadingsCount;
                }
                else
                {
                    x.AverageTps = entry.Tps;
                    x.ReadingsCount = 1;
                    x.StartDate = entry.Date;
                }
                _context.TpsdataWeeks.Update(x);
            }
        }

        public void AddOrUpdateMonthTPSEntry(Tpsdatum entry)
        {
            var targetDate = entry.Date.Value
                .Subtract(TimeSpan.FromSeconds(entry.Date.Value.Second))
                .Subtract(TimeSpan.FromMilliseconds(entry.Date.Value.Millisecond))
                .Subtract(TimeSpan.FromMinutes(entry.Date.Value.Minute))
                .Subtract(TimeSpan.FromHours(entry.Date.Value.Hour));
            Func<TpsdataMonth, bool> selector = x => x.Network == entry.Network && x.Provider == entry.Provider && x.StartDate.Value.Day == targetDate.Day;
            if (!_context.TpsdataMonths.Any(selector))
            {
                _context.TpsdataMonths.Add(new TpsdataMonth()
                {
                    Network = entry.Network,
                    AverageTps = entry.Tps,
                    Provider = entry.Provider,
                    StartDate = targetDate,
                    ReadingsCount = 1
                });
            }
            else
            {
                var x = _context.TpsdataMonths.First(selector);
                if (x.StartDate.Value.Month == targetDate.Month)
                {
                    x.AverageTps = ((x.AverageTps * x.ReadingsCount) + entry.Tps) / ++x.ReadingsCount;
                }
                else
                {
                    x.AverageTps = entry.Tps;
                    x.ReadingsCount = 1;
                    x.StartDate = entry.Date;
                }
                _context.TpsdataMonths.Update(x);
            }
        }
    }
}
