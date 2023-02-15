using ETHTPS.API.Core.Integrations.MSSQL.Services;
using ETHTPS.API.DependencyInjection;
using ETHTPS.API.Security.Core.Authentication;
using ETHTPS.API.Security.Core.Policies;
using ETHTPS.Configuration.Extensions;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using static ETHTPS.TaskRunner.Constants;

using NLog.Extensions.Hosting;
using ETHTPS.Configuration;
using ETHTPS.Data.Integrations.InfluxIntegration;
using Coravel;

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseNLog();
var services = builder.Services;
services.AddDatabaseContext(CURRENT_APP_NAME)
        .AddDataProviderServices(DatabaseProvider.MSSQL)
        .AddMixedCoreServices()
        .AddCustomCORSPolicies()
        .AddAPIKeyAuthenticationAndAuthorization()
        .AddControllers().AddControllersAsServices();

services.AddSwagger()
        .AddScoped<IInfluxWrapper, InfluxWrapper>()
        .AddDataUpdaterStatusService()
        .AddDataServices()
        .WithStore(DatabaseProvider.InfluxDB)
        .AddRunner(BackgroundServiceType.Coravel)
        .RegisterMicroservice(CURRENT_APP_NAME, "Task runner web app");

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();
app.UseRouting();
app.ConfigureSwagger();
app.UseAuthorization();
app.MapControllers();
app.UseRunner(BackgroundServiceType.Coravel);
app.Run();
