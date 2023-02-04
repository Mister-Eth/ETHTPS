using ETHTPS.API.Security.Core.Authentication;
using ETHTPS.API.Core.Infrastructure.Services.Implementations;
using ETHTPS.API.DependencyInjection;
using ETHTPS.API.Security.Core.Policies;
using ETHTPS.Configuration.Extensions;

var builder = WebApplication.CreateBuilder(args);
const string APP_NAME = "ETHTPS.API.TPS";
var services = builder.Services;
services.AddCoreServices();
services.AddDatabaseContext(APP_NAME);
services.AddScoped<TPSService>();
services.AddCustomCORSPolicies();
services.AddAPIKeyAuthenticationAndAuthorization();
services.AddControllers().AddControllersAsServices();
services.AddSwagger();
builder.Services.AddRazorPages();
services.RegisterMicroservice(APP_NAME, "TPS API");
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.UseRouting();
app.ConfigureSwagger();
app.UseAuthorization();
app.UseCustomCORSPolicies();
app.MapControllers().RequireAuthorization();
app.MapRazorPages();

app.Run();
