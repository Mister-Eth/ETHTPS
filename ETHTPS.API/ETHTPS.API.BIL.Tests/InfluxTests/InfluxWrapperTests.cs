using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.Data.Integrations.InfluxIntegration;
using ETHTPS.Data.Models.DataEntries;
using ETHTPS.Data.Models.DataUpdater;

using Microsoft.Extensions.DependencyInjection;

namespace ETHTPS.API.BIL.Tests.ServiceTests
{
    public class InfluxWrapperTests : TestBase
    {
        private IInfluxWrapper _influxWrapper;
        private const string DEFAULT_BUCKET_NAME = "blockinfo";
        private const string DEFAULT_MEASUREMENT_NAME = "blockinfo";

        [SetUp]
        public void Setup()
        {
            _influxWrapper = ServiceProvider.GetRequiredService<IInfluxWrapper>();
        }

        [Test]
        public void DependencyInjectionTest()
        {
            Assert.NotNull(_influxWrapper);
            Assert.Pass();
        }

        [Test]
        public void NoExceptionThrownTest()
        {
            Assert.DoesNotThrowAsync(async () =>
            {
                await foreach(var entry in  _influxWrapper.GetEntriesBetween<BlockInfo
                    >(DEFAULT_BUCKET_NAME, DEFAULT_MEASUREMENT_NAME, DateTime.Now.Subtract(TimeSpan.FromMinutes(1)), DateTime.Now)){ }
            });
            Assert.Pass();
        }
    }
}