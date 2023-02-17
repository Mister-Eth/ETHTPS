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
using ETHTPS.API.BIL.Infrastructure.Services.DataServices;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Integrations.MSSQL;

namespace ETHTPS.Tests.DataTransformation
{
    public class DataTransformationTests : TestBase
    {
        private IAggregatedDataService _dataService;
        private readonly L2DataRequestModel _defaultModel = new L2DataRequestModel()
        {
            Provider = "Ethereum",
            StartDate = DateTime.Now.Subtract(TimeSpan.FromDays(2)),
            EndDate = DateTime.Now.Subtract(TimeSpan.FromDays(1)),
            ReturnXAxisType = Data.Core.Models.DataPoints.XYPoints.XPointType.Date,
            Network = "Mainnet",
            BucketOptions = new BucketOptions()
            {
                UseTimeBuckets = true,
                CustomBucketSize = TimeSpan.FromHours(2),
            },
            IncludeSidechains = true,
        };

        [SetUp]
        public void Setup()
        {
            _dataService = ServiceProvider.GetRequiredService<IAggregatedDataService>();
        }

        [Test]
        public void NotNullTest()
        {
            Assert.That(_dataService != null);
        }

        [Test]
        public void InitializationTest()
        {

            Assert.DoesNotThrow(() =>
            {
                _dataService.GetTPS(_defaultModel, Data.Core.TimeInterval.OneWeek); _dataService.GetData(_defaultModel, Data.Core.DataType.TPS, Data.Core.TimeInterval.OneWeek);
            });
            Assert.DoesNotThrow(() =>
            {
                _dataService.GetGPS(_defaultModel, Data.Core.TimeInterval.OneWeek); _dataService.GetData(_defaultModel, Data.Core.DataType.GPS, Data.Core.TimeInterval.OneWeek);
            });
            Assert.DoesNotThrow(() =>
            {
                _dataService.GetGTPS(_defaultModel, Data.Core.TimeInterval.OneWeek); _dataService.GetData(_defaultModel, Data.Core.DataType.GasAdjustedTPS, Data.Core.TimeInterval.OneWeek);
            });
        }
    }
}
