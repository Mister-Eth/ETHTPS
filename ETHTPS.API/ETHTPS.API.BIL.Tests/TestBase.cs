using ETHTPS.API.DependencyInjection;
using ETHTPS.Data.Integrations.InfluxIntegration;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

using NLog.Extensions.Hosting;

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
            var builder = WebApplication.CreateBuilder(new WebApplicationOptions() { });
            builder.Host.UseNLog();
            var services = builder.Services;
            services.AddDatabaseContext("ETHTPS.API.General")
                    .AddCoreServices()
                    .AddDataUpdaterStatusService()
                    .AddScoped<IInfluxWrapper, InfluxWrapper>();
            ServiceProvider = services.BuildServiceProvider();
        }
    }
}
