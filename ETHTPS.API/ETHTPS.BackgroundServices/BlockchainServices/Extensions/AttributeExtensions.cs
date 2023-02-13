using System;
using System.Linq;

using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.Services.Attributes;

namespace ETHTPS.Services.BlockchainServices.Extensions
{
    public static class AttributeExtensions
    {
        public static string GetProviderName<T>(this T blockInfoProviderType)
            where T : IBlockInfoProvider => GetProviderName(typeof(T));

        public static string GetProviderName(this Type type)
        {
            var attributes = type.GetCustomAttributes(typeof(ProviderAttribute), true);
            if (attributes.Any())
            {
                var attribute = attributes.First();
                return (attribute as ProviderAttribute).Name;
            }
            else
            {
                throw new ArgumentNullException($"Provider {type} isn't marked with any {typeof(ProviderAttribute)}");
            }
        }

        public static string GetProviderNameFromFirstGenericArgument(this Type type)
        {
            if (type.GetGenericArguments().Length > 0)
            {
                var attributes = type.GetGenericArguments().First().GetCustomAttributes(typeof(ProviderAttribute), true);
                if (attributes.Any())
                {
                    var attribute = attributes.First();
                    return (attribute as ProviderAttribute).Name;
                }
            }
            return string.Empty;
        }
    }
}
