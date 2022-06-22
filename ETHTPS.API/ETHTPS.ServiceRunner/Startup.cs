using ETHTPS.Data.Database;
using ETHTPS.Services.DependencyInjection;

using Hangfire;
using Hangfire.SqlServer;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ETHTPS.Services.Constants.Queues;
using static ETHTPS.Services.Constants.CronConstants;

namespace ETHTPS.Services.ServiceRunner
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddRazorPages();
            var defaultConnectionString = Configuration.GetConnectionString("DefaultConnection");

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

            if (ConfigurationQueues?.Length > 0)
            {
                InitializeHangFire(defaultConnectionString);
                services.AddHangfire(x => x.UseSqlServerStorage(defaultConnectionString));
                services.AddHangfireServer(options =>
                {
                    options.SchedulePollingInterval = TimeSpan.FromSeconds(5);
                });
                services.AddDataProviders(ConfigurationQueues.Contains(TPSUPDATERQUEUE), ConfigurationQueues.Contains(CACHEUPDATERQUEUE), ConfigurationQueues.Contains(HISTORICALUPDATERQUEUE), ConfigurationQueues.Contains(TIMEWARPUPDATERQUEUE));
                if (ConfigurationQueues.Contains(STATUSUPDATERQUEUE))
                    services.AddStatusNotifiers();
            }
        }

        public string[] ConfigurationQueues => Configuration.GetSection("Hangfire").GetSection("Queues").Get<string[]>();

        public static void InitializeHangFire(string connectionString)
        {
            var sqlStorage = new SqlServerStorage(connectionString);
            JobStorage.Current = sqlStorage;
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }
            if (ConfigurationQueues?.Length > 0)
            {
                app.UseHangfireServer(options: new BackgroundJobServerOptions()
                {
                    Queues = ConfigurationQueues ?? new string[] { "default" }
                });
                if (Configuration.GetSection("Hangfire").GetValue<bool>("Show"))
                {
                    app.UseHangfireDashboard();
                }
            }
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "ETHTPS API V1");
                c.RoutePrefix = string.Empty;
            });
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
            });
        }
    }
}
