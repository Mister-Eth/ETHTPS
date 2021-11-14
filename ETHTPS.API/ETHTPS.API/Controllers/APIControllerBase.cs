using ETHTPS.Data;
using ETHTPS.Data.Database;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Controllers
{
    public abstract class APIControllerBase : ControllerBase
    {
        protected ETHTPSContext Context { get; private set; }

        protected APIControllerBase(ETHTPSContext context)
        {
            Context = context;
        }

        protected bool IsSidechain(string provider) => Context.Providers.First(x => x.Name == provider).TypeNavigation.Name == "Sidechain";

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
