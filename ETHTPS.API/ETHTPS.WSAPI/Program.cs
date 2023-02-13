using Coravel;

using ETHTPS.API.Core.Middlewares;
using ETHTPS.API.DependencyInjection;
using ETHTPS.API.Security.Core.Authentication;
using ETHTPS.API.Security.Core.Policies;
using ETHTPS.Configuration.Extensions;
using ETHTPS.WSAPI.WebsocketBehaviors;

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
                .RegisterMicroservice(APP_NAME);
var app = builder.Build();

app.UseMiddleware<AccesStatsMiddleware>();
app.UseRouting();
app.UseAuthorization();
app.ConfigureSwagger();
app.UseAuthorization();
var websocketServer = new WebSocketServer("ws://localhost:2000");
websocketServer.AddWebSocketService<LiveData>("/LiveData");
websocketServer.Start();
app.UseCors("_myAllowSpecificOrigins");
app.Run();
