﻿using ETHTPS.Data.Core;
using ETHTPS.Data.Integrations.MSSQL;

namespace ETHTPS.API.Core.Services
{
    public abstract class ContextServiceBase
    {
        protected EthtpsContext Context { get; private set; }

        protected ContextServiceBase(EthtpsContext context)
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
