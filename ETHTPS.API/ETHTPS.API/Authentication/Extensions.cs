using Microsoft.AspNetCore.Authorization;

namespace ETHTPS.API.Authentication
{
    public static class Extensions
    {
        public static void AddPolicy(this AuthorizationOptions options, PolicyDescriptor descriptor) => options.AddPolicy(descriptor.Name, p => p.RequireClaim(descriptor.Value));
    }
}
