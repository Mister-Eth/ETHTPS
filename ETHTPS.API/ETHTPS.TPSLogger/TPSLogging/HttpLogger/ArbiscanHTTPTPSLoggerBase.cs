using ETHTPS.API.Infrastructure.Database.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.TPSLogger.TPSLogging.HttpLogger
{
    public class ArbiscanHTTPTPSLoggerBase : HTTPTPSLoggerBase
    {
        public ArbiscanHTTPTPSLoggerBase(ETHTPSContext context, string name, string baseURL, string targetElement) : base(context, name, baseURL, targetElement)
        {
        }
    }
}
