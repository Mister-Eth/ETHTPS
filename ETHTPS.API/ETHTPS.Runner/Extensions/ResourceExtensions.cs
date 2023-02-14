
using Konsole;

namespace ETHTPS.Runner.Extensions
{
    public static class ResourceExtensions
    {
        public static ExtendedProgressBar ToProgressBar(this SystemResource resource, IConsole window) => new(new(window, (int)resource.Max, resource.Name.Length), resource);
    }
}
