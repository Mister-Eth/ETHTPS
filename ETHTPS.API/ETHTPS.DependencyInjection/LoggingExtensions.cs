namespace ETHTPS.API.DependencyInjection
{
    /*
    public static class LoggingExtensions
    {
        public static (int EnvironmentID, int MicroserviceID) GetCurrentEnvironmentLoggerParameters(this IServiceCollection services)
        {
            using (var built = services.BuildServiceProvider())
            {
                var provider = built.GetRequiredService<IDBConfigurationProvider>();
                return provider.GetCurrentEnvironmentLoggerParameters();
            }
        }

        public static IServiceCollection AddDBLoggerBoundToCallingAssembly(this IServiceCollection services)
        {
            using (var built = services.BuildServiceProvider())
            {
                var provider = built.GetRequiredService<IDBConfigurationProvider>();
                var configuration = JsonConvert.DeserializeObject<DbLoggerOptions>(provider.GetConfigurationStrings("LoggerConfiguration").First().Value);
                if (configuration != null)
                {
                    var parameters = services.GetCurrentEnvironmentLoggerParameters();
                    configuration.EnvironmentID = parameters.EnvironmentID;
                    configuration.CreatedBy = parameters.MicroserviceID;
                    services.AddSingleton<ILoggerProvider, DbLoggerProvider>();
                }
            }
                return services;
        }

        public static WebApplicationBuilder? AddDBLoggerBoundToCallingAssembly(this WebApplicationBuilder? builder)
        {
            if (builder == null) return builder;

            using (var built = builder.Services.BuildServiceProvider())
            {
                var provider = built.GetRequiredService<IDBConfigurationProvider>();
                var configuration = JsonConvert.DeserializeObject<DbLoggerOptions>(provider.GetConfigurationStrings("LoggerConfiguration").First().Value);
                if (configuration != null)
                {
                    var parameters = builder.Services.GetCurrentEnvironmentLoggerParameters();
                    configuration.EnvironmentID = parameters.EnvironmentID;
                    configuration.CreatedBy = parameters.MicroserviceID;
                    builder?.Logging.AddDbLogger(options =>
                    {
                        if (configuration != null)
                        {
                            options = configuration;
                        }
                    });
                }
            }
            return builder;
        }
    }*/
}
