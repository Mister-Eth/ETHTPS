

using ETHTPS.API.Middlewares;
using ETHTPS.Services;
using ETHTPS.Services.Infrastructure.Extensions;
using ETHTPS.Data.Database;

using Hangfire;
using Hangfire.SqlServer;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using System;
using System.Linq;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Data.Database.HistoricalDataProviders;
using ETHTPS.Services.PSServices;
using ETHTPS.Services.PSServices.Implementations;
using ETHTPS.Services.BlockchainServices.Status;
using ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord;
using ETHTPS.Services.BlockchainServices.BlockTime;
using ETHTPS.Services.Ethereum;
using ETHTPS.Services.Ethereum.Starkware;
using ETHTPS.Services.Ethereum.Scan.Implementations;
using static ETHTPS.Services.Constants.Queues;
using static ETHTPS.Services.Constants.CronConstants;
using ETHTPS.Services.Extensions;
using ETHTPS.Services.DependencyInjection;

namespace ETHTPS.API
{
    public class Startup
    {
        private readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var defaultConnectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.WithOrigins("https://ethtps.info");
                                      builder.WithOrigins("https://ultrasound.money/");
                                      builder.WithOrigins("http://localhost:3007");
                                      builder.WithOrigins("http://localhost:3000");
                                      builder.AllowAnyHeader();
                                  });
            });

            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
            }).AddJsonOptions(options => 
            { 
                options.JsonSerializerOptions.IgnoreNullValues = true; 
            });
            services.AddSwaggerGen(c =>
            {
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
            });
            services.AddDbContext<ETHTPSContext>(options => options.UseSqlServer(defaultConnectionString), ServiceLifetime.Transient);
            services.AddMemoryCache();

            services.AddCoreServices();
            services.AddHistoricalDataProviders();
           
        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            app.UseMiddleware<AccesStatsMiddleware>();
            // GlobalConfiguration.Configuration.UseActivator(new HangfireActivator(serviceProvider));
      
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "ETHTPS API V1");
                c.RoutePrefix = string.Empty;
            });
            app.UseRouting();
            app.UseCors(MyAllowSpecificOrigins);
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
