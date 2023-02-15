using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.API.DependencyInjection;
using ETHTPS.Data.Integrations.InfluxIntegration;
using ETHTPS.Data.Integrations.InfluxIntegration.HistoricalDataProviders;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

using NLog.Extensions.Hosting;

namespace ETHTPS.Tests
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
                    .AddMixedCoreServices()
                    .AddDataUpdaterStatusService()
                    .AddScoped<IInfluxWrapper, InfluxWrapper>()
                    .AddScoped<IAsyncHistoricalBlockInfoProvider, HistoricalInfluxProvider>()
                    .AddMSSQLHistoricalDataProviders();
            ServiceProvider = services.BuildServiceProvider();
        }
    }
}
