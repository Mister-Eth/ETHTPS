using ETHTPS.API.DependencyInjection;

using Microsoft.Extensions.DependencyInjection;

namespace ETHTPS.API.BIL.Tests
{
    /// <summary>
    /// A base test class for the BIL part of the framework
    /// </summary>
    public class TestBase
    {
        protected ServiceProvider ServiceProvider { get; private set; }
        protected TestBase()
        {
            IServiceCollection services = new ServiceCollection();
            services.AddDatabaseContext("ETHTPS.API.General")
                    .AddCoreServices()
                    .AddDataUpdaterStatusService();
            ServiceProvider = services.BuildServiceProvider();
        }
    }
}
