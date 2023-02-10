namespace ETHTPS.Data.Integrations.InfluxIntegration.ProviderServices
{
    public class MeasurementBucketCreator : IBucketCreator
    {
        private readonly IInfluxWrapper _influxWrapper;
        public MeasurementBucketCreator(IInfluxWrapper influxWrapper)
        {
            _influxWrapper = influxWrapper;
        }
        public bool Created { get; private set; }

        public async Task CreateBucketsAsync()
        {
            if (!Created)
            {
                //await _influxWrapper.DeleteAllBucketsAsync();
                var exists = await _influxWrapper.BucketExistsAsync("blockinfo");
                if (!exists)
                {
                    await _influxWrapper.CreateBucketAsync("blockinfo");
                }
                Created = true;
            }
        }
    }
}
