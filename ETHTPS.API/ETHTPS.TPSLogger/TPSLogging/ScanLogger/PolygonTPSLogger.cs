using ETHTPS.API.Infrastructure.Database.Models;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.TPSLogger.TPSLogging.ScanLogger
{
    public class PolygonTPSLogger : ScanTPSLoggerBase
    {
        public PolygonTPSLogger(ETHTPSContext context, string name, string apiKey) : base(context, name, apiKey, "polygonscan.com", 2.35)
        {
        }
    }
}
