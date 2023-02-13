using Microsoft.Extensions.DependencyInjection;

namespace ETHTPS.API.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddScoped(this IServiceCollection services, IEnumerable<Type> types)
        {
            types.ToList().ForEach(type => services.AddScoped(type));
            return services;
        }
    }
}
