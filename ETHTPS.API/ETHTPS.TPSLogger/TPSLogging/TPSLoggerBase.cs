using ETHTPS.API.Infrastructure.Database.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.TPSLogger.TPSLogging
{
    public abstract class TPSLoggerBase : ITPSLogger
    {
        protected TPSLoggerBase(ETHTPSContext context, string name)
        {
            Context = context;
            Name = name;
        }

        protected ETHTPSContext Context { get; private set; }
        protected string Name { get; private set; }

        public abstract void LogDataAsync();
    }
}
