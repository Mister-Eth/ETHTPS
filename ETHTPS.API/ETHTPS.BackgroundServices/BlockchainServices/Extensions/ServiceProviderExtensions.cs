using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.Services.Extensions;

using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace ETHTPS.Services.BlockchainServices.Extensions
{
    public static class ServiceProviderExtensions
    {
        /// <summary>
        /// Get all registered <see cref="ServiceDescriptor"/>
        /// </summary>
        /// <param name="provider"></param>
        /// <returns></returns>
        public static Dictionary<Type, ServiceDescriptor> GetAllServiceDescriptors(this IServiceProvider provider)
        {
            if (provider is ServiceProvider serviceProvider)
            {
                var result = new Dictionary<Type, ServiceDescriptor>();

                var engine = serviceProvider.GetFieldValue("_engine");
                var callSiteFactory = engine.GetPropertyValue("CallSiteFactory");
                var descriptorLookup = callSiteFactory.GetFieldValue("_descriptorLookup");
                if (descriptorLookup is IDictionary dictionary)
                {
                    foreach (DictionaryEntry entry in dictionary)
                    {
                        result.Add((Type)entry.Key, (ServiceDescriptor)entry.Value.GetPropertyValue("Last"));
                    }
                }

                return result;
            }

            throw new NotSupportedException($"Type '{provider.GetType()}' is not supported!");
        }

        public static IBlockInfoProvider GetProvider(this IServiceProvider services, string name)
        {
            var blockInfoProviders = services.GetAllServiceDescriptors().Where(d => d.Key.IsSubclassOf(typeof(IBlockInfoProvider)));
            return (IBlockInfoProvider)blockInfoProviders.First(x => x.Key.GetProviderName() == name).Value;
        }
    }
}
