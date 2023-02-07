using System;

namespace ETHTPS.Data.Integrations.InfluxIntegration
{
    public class InfluxException : Exception
    {
        public string Details { get; private set; }
        public InfluxException(string message, string details) : base(message)
        {
            Details = details;
        }

        public InfluxException(string message, Exception innerException) : base(message, innerException)
        {
        }

        public InfluxException(string message) : base(message)
        {
        }
    }
}
