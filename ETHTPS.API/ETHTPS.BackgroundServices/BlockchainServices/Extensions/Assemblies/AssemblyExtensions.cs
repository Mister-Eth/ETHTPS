using ETHTPS.Services.BlockchainServices.Extensions.Assemblies;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Extensions.Assemblies
{
    public static class AssemblyExtensions
    {
        public static IEnumerable<BlockInfoProviderDescriptor> GetAllBlockInfoProviders(this Assembly assembly) =>
            assembly.GetTypes()
            .Where(x => typeof(IBlockInfoProvider).IsAssignableFrom(x) )
            .Select(type => new BlockInfoProviderDescriptor()
            {
                ImplementationType = type,
                Attribute = type.GetCustomAttribute<ProviderAttribute>()
            });
    }
}
