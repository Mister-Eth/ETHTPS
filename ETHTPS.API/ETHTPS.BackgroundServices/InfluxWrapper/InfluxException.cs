using System;

namespace ETHTPS.Services.InfluxWrapper
{
    public class InfluxException : Exception
    {
        public InfluxException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
