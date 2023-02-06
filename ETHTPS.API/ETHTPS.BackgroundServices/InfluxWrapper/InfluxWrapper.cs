using InfluxDB.Client;
using InfluxDB.Client.Api.Domain;

using ServiceStack;

using System;

namespace ETHTPS.Services.InfluxWrapper
{
    /// <summary>
    /// Calling it a wrapper so we don't conflict with the library
    /// </summary>
    public class InfluxWrapper : IInfluxWrapper
    {
        private readonly InfluxWrapperConfiguration _configuration;
        private readonly InfluxDBClient _influxClient;

        public InfluxWrapper(InfluxWrapperConfiguration configuration)
        {
            _configuration = configuration;
            _influxClient = new InfluxDBClient(_configuration.URL, _configuration.Token);
        }

        public void Log<T>(T entry)
            where T : IMeasurement
        {
            try
            {
                using (var writeApi = _influxClient.GetWriteApi())
                {
                    writeApi.WriteMeasurement(entry.ToLineProtocol(), WritePrecision.Ms, _configuration.Bucket, _configuration.Org);
                }
            }
            catch (Exception e)
            {
                throw new InfluxException("Influx write failed", e);
            }
        }
    }
}
