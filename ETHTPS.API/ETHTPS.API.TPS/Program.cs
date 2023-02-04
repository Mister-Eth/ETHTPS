using ETHTPS.API.Authentication;
using ETHTPS.API.Core.Controllers;
using ETHTPS.API.Core.Infrastructure.Services.Implementations;
using ETHTPS.API.DependencyInjection;
using ETHTPS.API.Security.Policies;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;
services.AddDatabaseContext(builder.Configuration);
services.AddCoreServices();
services.AddScoped<TPSService>();
services.AddScoped<TPSController>();
services.AddCustomCORSPolicies();
services.AddAPIKeyAuthenticationAndAuthorization();
services.AddControllers().AddControllersAsServices();
services.AddSwagger();
builder.Services.AddRazorPages();

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

app.Run();
