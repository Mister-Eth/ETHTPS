using Coravel;

using ETHTPS.API.Core.Integrations.MSSQL.Services;
using ETHTPS.API.Core.Middlewares;
using ETHTPS.API.DependencyInjection;
using ETHTPS.API.Security.Core.Authentication;
using ETHTPS.API.Security.Core.Policies;
using ETHTPS.Configuration.Extensions;
using ETHTPS.WSAPI.Infrastructure;
using ETHTPS.WSAPI.WebsocketInfra;

using WebSocketSharp.Server;

var builder = WebApplication.CreateBuilder(args);
const string APP_NAME = "ETHTPS.WSAPI";
builder.Services.AddRazorPages();
builder.Services.AddControllers();
builder.Services.AddCustomCORSPolicies()
                .AddDatabaseContext(APP_NAME)
                .AddSwagger()
                .AddAPIKeyAuthenticationAndAuthorization()
                .AddMixedCoreServices()
                .AddDataUpdaterStatusService()
                .AddQueue()
                .AddScheduler()
                .AddScoped<PingAllClientsTask>()
                .AddScoped<SendLiveDataTask>()
                .RegisterMicroservice(APP_NAME);

WebSocketServer websocketServer = new("ws://localhost:2000")
{
    KeepClean = true,
    WaitTime = TimeSpan.FromSeconds(30),
};
builder.Services.AddSingleton(websocketServer);

var app = builder.Build();

websocketServer.AddWebSocketService("/LiveData",
    () =>
    {
        var scope = app.Services.CreateScope();
        return new WSClientHandler(scope?.ServiceProvider?.GetRequiredService<ILogger<WSClientHandler>>(), scope?.ServiceProvider?.GetRequiredService<GeneralService>());
    });
websocketServer.Start();

app.UseMiddleware<AccesStatsMiddleware>();
app.UseRouting();
app.UseAuthorization();
app.ConfigureSwagger();
app.UseAuthorization();
var provider = app.Services;
provider.UseScheduler(scheduler =>
{
    scheduler.Schedule<PingAllClientsTask>().EveryFifteenSeconds();
    scheduler.Schedule<SendLiveDataTask>().EverySeconds(4);
});

app.UseCors("_myAllowSpecificOrigins");
app.Run();
