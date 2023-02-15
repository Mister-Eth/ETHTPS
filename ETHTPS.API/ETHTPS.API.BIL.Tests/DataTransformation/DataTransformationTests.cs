using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.Data.Integrations.InfluxIntegration;
using ETHTPS.Data.Integrations.MSSQL.HistoricalDataServices;
using ETHTPS.Data.Core.Models.Queries;

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
        private IEnumerable<IHistoricalDataProvider> _DataServices;

        [SetUp]
        public void Setup()
        {
            _DataServices = ServiceProvider.GetRequiredService<IEnumerable<IHistoricalDataProvider>>();
        }

        [Test]
        public void NotNullTest()
        {
            Assert.That(_DataServices != null);
        }

        [Test]
        public void InitializationTest()
        {
            Assert.DoesNotThrow(() =>
            {
                //   _DataServices.GetData(ProviderQueryModel.All);
            });
        }
    }
}
