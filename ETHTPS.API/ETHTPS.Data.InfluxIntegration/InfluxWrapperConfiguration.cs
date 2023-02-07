using ETHTPS.Configuration;
using ETHTPS.Configuration.Extensions;

using System;

namespace ETHTPS.Data.Integrations.InfluxIntegration
{
    public sealed class InfluxWrapperConfiguration
    {
        public string URL { get; set; }
        public string Bucket { get; set; }
        public string Org { get; set; }
        public string OrgID { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public static InfluxWrapperConfiguration FromConfigurationProvider(IDBConfigurationProvider configurationProvider)
        {
            Func<string, string> getConfigurationString = (key) => configurationProvider.GetFirstConfigurationStringForCurrentEnvironment(key, "ETHTPS.Services.dll");
            return new InfluxWrapperConfiguration()
            {
                Bucket = getConfigurationString("InfluxDB_prod_bucket"),
                URL = getConfigurationString("InfluxDB_prod_url"),
                Org = getConfigurationString("InfluxDB_prod_org"),
                Token = getConfigurationString("InfluxDB_token"),
                Username = getConfigurationString("InfluxDB_prod_user"),
                Password = getConfigurationString("InfluxDB_prod_password"),
                OrgID = getConfigurationString("InfluxDB_prod_orgid")
            };
        }
    }
}
