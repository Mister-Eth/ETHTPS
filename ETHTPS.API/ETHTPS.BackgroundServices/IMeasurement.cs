using InfluxDB.Client.Writes;

namespace ETHTPS.Services
{
    public interface IMeasurement
    {
        PointData ToMeasurement();
        string ToLineProtocol();
    }
}
