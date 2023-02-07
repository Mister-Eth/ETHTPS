using ETHTPS.API.Security.Core.Authentication;
using ETHTPS.API.DependencyInjection;
using ETHTPS.API.Security.Core.Policies;
using ETHTPS.WSAPI.BackgroundServices;
using ETHTPS.WSAPI.Queuing;
using ETHTPS.WSAPI.Services;
using ETHTPS.Configuration.Extensions;
using NLog.Extensions.Hosting;

const string APP_NAME = "ETHTPS.WSAPI";
var builder = WebApplication.CreateBuilder(args);
builder.Host.UseNLog();
var services = builder.Services;
services.AddCustomCORSPolicies();
services.AddDatabaseContext(APP_NAME);
services.AddAPIKeyProvider();
services.AddAPIKeyAuthenticationAndAuthorization();
services.AddCoreServices();
services.AddRazorPages();
services.AddHostedService<WebSocketProcessor>();
services.AddScoped<IScopedProcessingService, ScopedProcessingService>();
services.AddSingleton<MonitorLoop>();
services.AddHostedService<QueuedHostedService>();
services.AddSingleton<IBackgroundTaskQueue>(ctx =>
{
    if (!int.TryParse(builder.Configuration["WSQueueCapacity"], out var queueCapacity))
        queueCapacity = 100;
    return new BackgroundTaskQueue(queueCapacity);
});
services.RegisterMicroservice(APP_NAME, "Websockets API");
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization(); 
app.UseCustomCORSPolicies();
app.MapControllers().RequireAuthorization();
app.MapRazorPages();

WebSocketOptions webSocketOptions = new ()
{
    KeepAliveInterval = TimeSpan.FromMinutes(2)
};

webSocketOptions.AllowedOrigins.Add("https://localhost");
webSocketOptions.AllowedOrigins.Add("https://ethtps.info");

app.UseWebSockets(webSocketOptions);

app.Run(async (context) =>
{
    using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
    var socketFinishedTcs = new TaskCompletionSource<object>();

    WebSocketProcessor.AddSocket(webSocket, socketFinishedTcs);

    await socketFinishedTcs.Task;
});