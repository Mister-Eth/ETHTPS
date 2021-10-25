using EtherscanApi.Net.Interfaces;


using ETHTPS.API.Middlewares;
using ETHTPS.BackgroundServices.Activators;
using ETHTPS.BackgroundServices.IntervalDataUpdaters;
using ETHTPS.BackgroundServices.TPSDataUpdaters.Http;
using ETHTPS.BackgroundServices.TPSDataUpdaters.Standard;
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
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

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
                                      builder.WithOrigins("http://localhost:28999");
                                      builder.WithOrigins("http://localhost:3007");
                                  });
            });

            services.AddControllers().AddNewtonsoftJson().AddJsonOptions(options => { options.JsonSerializerOptions.IgnoreNullValues = true; });
            services.AddSwaggerGen();
            services.AddDbContext<ETHTPSContext>(options => options.UseSqlServer(defaultConnectionString));
            services.AddMemoryCache();
            InitializeHangFire(defaultConnectionString);
            services.AddHangfire(x => x.UseSqlServerStorage(defaultConnectionString));
            services.AddHangfireServer();
            if (Configuration.GetValue<bool>("AddDataUpdaters"))
            {
                AddDataUpdaters(services);
            }
            if (Configuration.GetValue<bool>("AddTPSDataUpdaters"))
            {
                AddTPSDataUpdaters(services);
            }
        }

        public static void InitializeHangFire(string connectionString)
        {
            var sqlStorage = new SqlServerStorage(connectionString);
            JobStorage.Current = sqlStorage;
        }

        private void AddTPSDataUpdaters(IServiceCollection services)
        {
            services.AddScoped<ArbiscanUpdater>();
#pragma warning disable CS0618 // Type or member is obsolete
            RecurringJob.AddOrUpdate<ArbiscanUpdater>("", x => x.RunAsync(), Cron.Se(5));
#pragma warning restore CS0618 // Type or member is obsolete
            services.AddScoped<EtherscanUpdater>();
            services.AddScoped<OptimismUpdater>();
            services.AddScoped<PolygonscanUpdater>();
            services.AddScoped<XDAIUpdater>();
            services.AddScoped<ZKSwapUpdater>();
            services.AddScoped<ZKSyncUpdater>();
            services.AddScoped<AVAXCChainUpdater>();
            //services.AddScoped<DummyDyDxUpdater>();
        }

        private void AddDataUpdaters(IServiceCollection services)
        {
            services.AddScoped<InstantDataUpdater>();
            services.AddScoped<OneHourDataUpdater>();
            services.AddScoped<OneDayDataUpdater>();
            services.AddScoped<OneWeekDataUpdater>();
            services.AddScoped<OneMonthDataUpdater>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
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
            app.UseHangfireServer();
            app.UseHangfireDashboard();
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
