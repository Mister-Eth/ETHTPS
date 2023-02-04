﻿using ETHTPS.Data.Database;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.DependencyInjection
{
    public static class DatabaseExtensions
    {
        public static string? GetDefaultConnectionString(this IConfiguration configuration) => configuration.GetConnectionString("DefaultConnection");
        public static IServiceCollection AddDatabaseContext(this IServiceCollection services, IConfiguration configuration)
        {
            var defaultConnectionString = configuration.GetDefaultConnectionString();
            services.AddDbContext<EthtpsContext>(options => options.UseSqlServer(defaultConnectionString), ServiceLifetime.Transient);
            return services;
        }
    }
}
