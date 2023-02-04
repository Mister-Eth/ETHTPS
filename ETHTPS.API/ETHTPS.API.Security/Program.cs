using ETHTPS.API.Security.Core.Authentication;
using ETHTPS.API.Core.Infrastructure.Services.Implementations;
using ETHTPS.API.DependencyInjection;
using ETHTPS.API.Security.Core.Policies;
using ETHTPS.Configuration.Extensions;

var builder = WebApplication.CreateBuilder(args);
const string APP_NAME = "ETHTPS.API.Security";
var services = builder.Services;
services.AddDatabaseContext(APP_NAME);
services.AddCoreServices();
services.AddCustomCORSPolicies();
services.AddAPIKeyAuthenticationAndAuthorization();
services.AddControllers().AddControllersAsServices();
services.AddSwagger();
builder.Services.AddRazorPages();
services.RegisterMicroservice(APP_NAME, "Security API");
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.UseRouting();
app.ConfigureSwagger();
app.UseAuthorization();

app.MapRazorPages();
app.UseCustomCORSPolicies();
app.MapControllers().RequireAuthorization();
app.Run();
