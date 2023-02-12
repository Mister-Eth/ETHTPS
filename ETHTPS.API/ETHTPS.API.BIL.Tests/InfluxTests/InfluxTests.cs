using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.Data.Integrations.InfluxIntegration;
using ETHTPS.Data.Models.DataEntries;
using ETHTPS.Data.Models.DataUpdater;

using Microsoft.Extensions.DependencyInjection;

namespace ETHTPS.API.BIL.Tests.ServiceTests
{
    public class InfluxTests : TestBase
    {
        private IInfluxWrapper _influxWrapper;
        private IAsyncHistoricalBlockInfoProvider _asyncHistoricalBlockInfoProvider;
        private const string DEFAULT_BUCKET_NAME = "blockinfo";
        private const string DEFAULT_MEASUREMENT_NAME = "blockinfo";

        [SetUp]
        public void Setup()
        {
            _influxWrapper = ServiceProvider.GetRequiredService<IInfluxWrapper>();
            _asyncHistoricalBlockInfoProvider = ServiceProvider.GetRequiredService<IAsyncHistoricalBlockInfoProvider>();
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
                await foreach (var entry in _influxWrapper.GetEntriesBetween<Block
                    >(DEFAULT_BUCKET_NAME, DEFAULT_MEASUREMENT_NAME, DateTime.Now.Subtract(TimeSpan.FromMinutes(1)), DateTime.Now)) { }
            });
            Assert.DoesNotThrowAsync(async () =>
            {
                await foreach (var entry in _influxWrapper.GetEntriesForPeriod<Block
                    >(DEFAULT_BUCKET_NAME, DEFAULT_MEASUREMENT_NAME, Data.Core.TimeInterval.OneHour)) { }
            });
            Assert.DoesNotThrowAsync(async () =>
            {
                await foreach (var entry in _asyncHistoricalBlockInfoProvider.GetLatestBlocksAsync(new Data.Models.Query.ProviderQueryModel()
                {
                    Provider = "Ethereum",
                    Network = "Mainnet"
                }, Data.Core.TimeInterval.OneHour))
                { }
            });
            Assert.Pass();
        }
    }
}