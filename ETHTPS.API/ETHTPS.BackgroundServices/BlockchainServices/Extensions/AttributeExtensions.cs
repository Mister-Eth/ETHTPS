using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Extensions
{
    public static class AttributeExtensions
    {
        public static string GetProviderName<T>(this T blockInfoProviderType)
            where T: IBlockInfoProvider
        {
            var attributes = typeof(T).GetCustomAttributes(typeof(ProviderAttribute), true);
            if (attributes.Any())
            {
                var attribute = attributes.First();
                return (attribute as ProviderAttribute).Name;
            }
            else
            {
                throw new ArgumentNullException($"Provider {typeof(T)} isn't marked with any {typeof(ProviderAttribute)}");
            }
        }
    }
}
