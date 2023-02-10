using ETHTPS.API.Security.Core.Authentication;
using ETHTPS.API.DependencyInjection;
using ETHTPS.API.Security.Core.Policies;
using ETHTPS.Configuration.Extensions;
using NLog.Extensions.Hosting;
using ETHTPS.API.Core.Middlewares;

const string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
const string APP_NAME = "ETHTPS.WSAPI";
var builder = WebApplication.CreateBuilder(args);
builder.Host.UseNLog();
var services = builder.Services;

services.AddDatabaseContext(APP_NAME);
services.AddCustomCORSPolicies();

services.AddControllersWithViews()
    .AddControllersAsServices()
    .ConfigureNewtonsoftJson();
services.AddSwagger()
        .AddMemoryCache()
        .AddAPIKeyProvider()
        .AddAPIKeyAuthenticationAndAuthorization()
        .AddCoreServices()
        .AddDataUpdaterStatusService()
        .RegisterMicroservice(APP_NAME, "Websockets API");
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();
app.UseMiddleware<AccesStatsMiddleware>();
app.ConfigureSwagger();
app.UseRouting();
app.UseAuthorization();
app.UseCors(MyAllowSpecificOrigins);
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers().RequireAuthorization();
});

WebSocketOptions webSocketOptions = new ()
{
    KeepAliveInterval = TimeSpan.FromMinutes(2)
};

webSocketOptions.AllowedOrigins.Add("https://localhost");
webSocketOptions.AllowedOrigins.Add("https://ethtps.info");

app.UseWebSockets(webSocketOptions);