namespace ETHTPS.Services.InfluxWrapper
{
    /// <summary>
    /// Calling it a wrapper so we don't conflict with the library
    /// </summary>
    public class InfluxWrapper : IInfluxWrapper
    {
        private readonly InfluxWrapperConfiguration _configuration;

        public InfluxWrapper(InfluxWrapperConfiguration configuration)
        {
            _configuration = configuration;
        }
    }
}
