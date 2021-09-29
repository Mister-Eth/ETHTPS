using ETHTPS.API.Controllers;
using ETHTPS.API.Infrastructure.Database.Models;
using ETHTPS.Frontend.Models;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Frontend.Controllers
{
    public class HomeController : Controller
    {
        private readonly ETHTPSContext _context;
        private readonly APIController _apiController;

        public HomeController(ETHTPSContext context)
        {
            _context = context;
            _apiController = new APIController(_context);
        }

        public async Task<IActionResult> Index()
        {
            var result = new IndexViewModel()
            {
                Providers = _context.Providers.Select(x => x.Name).ToList(),
                CurrentTPS = (await _apiController.GetTPS("Ethereum", "Instant")).Sum(x => x.TPS), 
                Intervals = Enum.GetValues(typeof(TimeInterval)).Cast<TimeInterval>().Select(x=>x.ToString())
            };
            foreach(var provider in result.Providers)
            {
                var chartData = new ChartData()
                {
                    Provider = provider
                };
                result.ChartData.Data.Add(chartData);
                foreach (var interval in Enum.GetValues(typeof(TimeInterval)))
                {
                    if (interval.ToString() == "Instant")
                        continue;
                    var dataGrouping = new IntervalDataGrouping()
                    {
                        Interval = interval.ToString(),
                        Data = (await _apiController.GetTPS(provider, interval.ToString())).Select(x=>new DataPoint()
                        {
                            Date = x.Date,
                            TPS = x.TPS
                        }).ToList()
                    };
                    result.ChartData.AddDataGrouping(provider, dataGrouping);
                }
            }
            return View(result);
        }
    }
}
