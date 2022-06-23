using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Attributes
{
    /// <summary>
    /// Specifies the name of the provider. The name must match the database name.
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = false)]
    public class ProviderAttribute : Attribute, IBlockInfoProviderDescriptor
    {
        public ProviderAttribute(string name)
        {
            Name = name;
        }

        public string Name { get; set; }
    }
}
