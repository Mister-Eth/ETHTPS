using Coravel;

using ETHTPS.API.BIL.Infrastructure.Services;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.API.Core.Integrations.MSSQL.Services;
using ETHTPS.API.Core.Middlewares;
using ETHTPS.API.DependencyInjection;
using ETHTPS.API.Security.Core.Authentication;
using ETHTPS.API.Security.Core.Policies;
using ETHTPS.Configuration.Extensions;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.WSAPI.Infrastructure.BackgroundTasks;
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
                .AddDataProviderServices(DatabaseProvider.MSSQL)
                .AddMixedCoreServices()
                .AddDataUpdaterStatusService()
                .AddQueue()
                .AddScheduler()
                .AddScoped<PingAllClientsTask>()
                .AddScoped<SendLiveDataTask>()
                .AddScoped<UpdateVisitorCountTask>()
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
        return new WSClientHandler(scope?.ServiceProvider?.GetRequiredService<ILogger<WSClientHandler>>(),
                                       scope?.ServiceProvider?.GetRequiredService<GeneralService>(),
                                       scope?.ServiceProvider?.GetRequiredService<IWebsiteStatisticsService>(),
                                       scope?.ServiceProvider.GetRequiredService<EthtpsContext>());

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
    scheduler.Schedule<PingAllClientsTask>().EverySeconds(8);
    scheduler.Schedule<SendLiveDataTask>().EverySeconds(4);
    using (var scope = provider.CreateScope())
    {
        var visitorService = scope.ServiceProvider.GetRequiredService<IWebsiteStatisticsService>();
        if (visitorService.Enabled)
        {
            scheduler.Schedule<SendLiveDataTask>().EverySeconds(30);
            visitorService.SetNumberOfCurrentVisitors(0);
        }
    }
});

app.UseCors("_myAllowSpecificOrigins");
app.Run();
