using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.Data.Integrations.InfluxIntegration;
using ETHTPS.Data.Integrations.MSSQL.HistoricalDataProviders;
using ETHTPS.Data.Models.Queries;

using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Tests.DataTransformation
{
    public class DataTransformationTests : TestBase
    {
        private IEnumerable<IHistoricalDataProvider> _dataProviders;

        [SetUp]
        public void Setup()
        {
            _dataProviders = ServiceProvider.GetRequiredService<IEnumerable<IHistoricalDataProvider>>();
        }

        [Test]
        public void NotNullTest()
        {
            Assert.That(_dataProviders != null);
        }

        [Test]
        public void InitializationTest()
        {
            Assert.DoesNotThrow(() =>
            {
                //   _dataProviders.GetData(ProviderQueryModel.All);
            });
        }
    }
}
