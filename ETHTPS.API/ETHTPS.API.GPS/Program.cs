using ETHTPS.API.Security.Core.Authentication;
using ETHTPS.API.Core.Infrastructure.Services.Implementations;
using ETHTPS.API.DependencyInjection;
using ETHTPS.API.Security.Core.Policies;
using ETHTPS.Configuration.Extensions;

var builder = WebApplication.CreateBuilder(args);
const string APP_NAME = "ETHTPS.API.GPS";
var services = builder.Services;
services.AddDatabaseContext(APP_NAME);
services.AddAPIKeyAuthenticationAndAuthorization();
services.AddCoreServices();
services.AddScoped<GPSService>();
services.AddCustomCORSPolicies();
services.AddControllers().AddControllersAsServices();
services.AddSwagger();
builder.Services.AddRazorPages();
services.RegisterMicroservice(APP_NAME, "GPS API");
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
