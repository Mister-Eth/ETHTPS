namespace ETHTPS.Services.InfluxWrapper
{
    public interface IInfluxWrapper
    {
        void Log<T>(T entry)
            where T: IMeasurement;
    }
}
