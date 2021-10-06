using EtherscanApi.Net.Interfaces;

using ETHTPS.API.Infrastructure.BackgroundServices;
using ETHTPS.API.Infrastructure.BackgroundServices.IntervalDataUpdaters;
using ETHTPS.API.Infrastructure.BackgroundServices.TPSDataUpdaters.Http;
using ETHTPS.API.Infrastructure.BackgroundServices.TPSDataUpdaters.Standard;
using ETHTPS.API.Infrastructure.Database.Models;
using ETHTPS.API.Middlewares;

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
                                      builder.WithOrigins("http://localhost:28999");
                                  });
            });

            services.AddControllers().AddNewtonsoftJson().AddJsonOptions(options => { options.JsonSerializerOptions.IgnoreNullValues = true; });
            services.AddSwaggerGen();
            services.AddDbContext<ETHTPSContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddMemoryCache();
            AddDataUpdaters(services);
            AddTPSDataUpdaters(services);
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
            services.AddHostedService<InstantDataUpdaterBase>();
            services.AddHostedService<OneHourDataUpdaterBase>();
            services.AddHostedService<OneDayDataUpdaterBase>();
            services.AddHostedService<OneWeekDataUpdaterBase>();
            services.AddHostedService<OneMonthDataUpdaterBase>();
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
