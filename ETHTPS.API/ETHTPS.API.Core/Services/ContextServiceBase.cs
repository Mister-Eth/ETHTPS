using ETHTPS.Data.Core;
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

        protected IEnumerable<TimeInterval> TimeIntervals()
        {
            var excluded = new[] { "Instant", "Latest", "All", "Auto" };
            foreach (var interval in Enum.GetValues(typeof(TimeInterval)))
            {
                if (excluded.Contains(interval.ToString()))
                    continue;

                yield return (TimeInterval)interval;
            }
        }
    }
}
