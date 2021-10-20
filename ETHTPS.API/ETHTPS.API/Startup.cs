using EtherscanApi.Net.Interfaces;


using ETHTPS.API.Middlewares;
using ETHTPS.BackgroundServices.IntervalDataUpdaters;
using ETHTPS.BackgroundServices.TPSDataUpdaters.Http;
using ETHTPS.BackgroundServices.TPSDataUpdaters.Standard;
using ETHTPS.Data.Database;

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
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.WithOrigins("https://ethtps.info");
#if DEBUG
                                      builder.WithOrigins("http://localhost:28999");
                                      builder.WithOrigins("http://localhost:3007");
#endif
                                  });
            });

            services.AddControllers().AddNewtonsoftJson().AddJsonOptions(options => { options.JsonSerializerOptions.IgnoreNullValues = true; });
            services.AddSwaggerGen();
            services.AddDbContext<ETHTPSContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddMemoryCache();
#if DEBUG
#else
            AddDataUpdaters(services);
            AddTPSDataUpdaters(services);
#endif
        }

        private void AddTPSDataUpdaters(IServiceCollection services)
        {
            services.AddHostedService<ArbiscanUpdater>();
            services.AddHostedService<EtherscanUpdater>();
            services.AddHostedService<OptimismUpdater>();
            services.AddHostedService<PolygonscanUpdater>();
            services.AddHostedService<XDAIUpdater>();
            services.AddHostedService<ZKSwapUpdater>();
            services.AddHostedService<ZKSyncUpdater>();
        }

        private void AddDataUpdaters(IServiceCollection services)
        {
            services.AddHostedService<InstantDataUpdater>();
            services.AddHostedService<OneHourDataUpdater>();
            services.AddHostedService<OneDayDataUpdater>();
            services.AddHostedService<OneWeekDataUpdater>();
            services.AddHostedService<OneMonthDataUpdater>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
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
