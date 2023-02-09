namespace ETHTPS.Data.Integrations.InfluxIntegration
{
    /// <summary>
    /// Represents a wrapper for the official InfluxDB library
    /// </summary>
    public interface IInfluxWrapper : IInfluxReader, IInfluxWriter, IInfluxDeleter
    {
    }
}
