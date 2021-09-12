using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.TPSProviders
{
    [AttributeUsage(AttributeTargets.Class)]
    public class ProviderAttribute : Attribute
    {

        public string Name { get; private set; }

        public ProviderAttribute(string name)
        {
            Name = name;
        }
    }
}
