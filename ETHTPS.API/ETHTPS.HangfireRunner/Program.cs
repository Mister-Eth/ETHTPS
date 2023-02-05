using ETHTPS.API.Core.Infrastructure.Services.Implementations;
using ETHTPS.API.DependencyInjection;
using ETHTPS.API.Security.Core.Authentication;
using ETHTPS.API.Security.Core.Policies;
using ETHTPS.Configuration.Extensions;

using NLog.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseNLog();
const string APP_NAME = "ETHTPS.HangfireRunner";
var services = builder.Services;
services.AddCoreServices();
services.AddDatabaseContext(APP_NAME);
services.AddScoped<TimeWarpService>();
services.AddCustomCORSPolicies();
services.AddAPIKeyAuthenticationAndAuthorization();
services.AddControllers().AddControllersAsServices();
services.AddSwagger();
builder.Services.AddRazorPages();

var configurationQueues = builder.Configuration.GetSection("Hangfire").GetSection("Queues").Get<string[]>();
if (configurationQueues?.Length > 0)
{
    services.InitializeHangfire(APP_NAME);
    services.AddHangfireServer(APP_NAME);
    services.AddTPSDataUpdaters(builder.Configuration);
    services.AddHistoricalBlockInfoDataUpdaters(configurationQueues);
    services.AddTimeWarpUpdaters(configurationQueues)
    .AddStatusNotifiers(configurationQueues);
}

services.RegisterMicroservice(APP_NAME, "Hangfire runner web app");
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();
app.ConfigureHangfire(builder.Configuration);
app.UseRouting();
app.ConfigureSwagger();
app.UseAuthorization();
app.MapControllers();
app.MapRazorPages();

app.Run();
