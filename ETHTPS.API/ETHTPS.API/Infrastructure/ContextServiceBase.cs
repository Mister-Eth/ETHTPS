using ETHTPS.Data;
using ETHTPS.Data.Database;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure
{
    public abstract class ContextServiceBase
    {
        protected ETHTPSContext Context { get; private set; }

        protected ContextServiceBase(ETHTPSContext context)
        {
            Context = context;
        }

        protected bool IsSidechain(string provider)
        {
            bool result = false;
            lock (Context.LockObj)
            {
                result = Context.Providers.First(x => x.Name == provider).TypeNavigation.Name == "Sidechain";
            }
            return result;
        }

        protected IEnumerable<string> TimeIntervals()
        {
            foreach (var interval in Enum.GetValues(typeof(TimeInterval)))
            {
                if (interval.ToString() == "Instant" || interval.ToString() == "Latest")
                    continue;

                yield return interval.ToString();
            }
        }
    }
}
