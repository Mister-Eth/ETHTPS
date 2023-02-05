using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

using NLog.Extensions.Hosting;

using System.IO;
using System.Reflection;

namespace ETHTPS.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //AppDomain.CurrentDomain.SetData("APP_CONFIG_FILE", Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) + "appsettings.json"));
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(configureDelegate => configureDelegate.SetBasePath(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)))
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
            .UseNLog();
    }
}
