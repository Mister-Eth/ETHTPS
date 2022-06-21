using System;
using System.Reflection;
using System.Linq;
using System.Collections.Generic;

namespace ETHTPS.API.Infrastructure.Extensions
{
    public static class AssemblyExtensions
    {
        public static IEnumerable<Assembly> GetApplicationAssemblies()
        {
            return AppDomain.CurrentDomain.GetAssemblies().Where(x => x.FullName.Contains("ETHTPS"));
        }
    }
}
