using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.Data.Core.Models.DataUpdater;

using Microsoft.Extensions.DependencyInjection;

namespace ETHTPS.Tests.ServiceTests
{
    public class DataUpdaterService : TestBase
    {
        private IDataUpdaterStatusService _statusService;
        private const string TEST_PROVIDER_NAME = "Ethereum";
        private const UpdaterType TEST_UPDATERTYPE_NAME = UpdaterType.BlockInfo;
        private const UpdaterStatus TEST_STATUS = UpdaterStatus.InTest;

        [SetUp]
        public void Setup()
        {
            _statusService = ServiceProvider.GetRequiredService<IDataUpdaterStatusService>();
        }

        [Test]
        public void DependencyInjectionTest()
        {
            Assert.NotNull(_statusService);
            Assert.Pass();
        }

        [Test]
        public void NoExceptionThrownTest()
        {
            Assert.DoesNotThrow(() =>
            {
                _statusService.GetAllStatuses();
            });
            Assert.DoesNotThrow(() =>
            {
                _statusService.GetStatusFor(TEST_PROVIDER_NAME);
            });
            Assert.DoesNotThrow(() =>
            {
                _statusService.GetStatusFor(TEST_PROVIDER_NAME, TEST_UPDATERTYPE_NAME);
            });
            Assert.DoesNotThrow(() =>
            {
                _statusService.IncrementNumberOfFailures(TEST_PROVIDER_NAME, TEST_UPDATERTYPE_NAME);
            });
            Assert.DoesNotThrow(() =>
            {
                _statusService.IncrementNumberOfSuccesses(TEST_PROVIDER_NAME, TEST_UPDATERTYPE_NAME);
            });
            Assert.DoesNotThrow(() =>
            {
                _statusService.MarkAsRanSuccessfully(TEST_PROVIDER_NAME, TEST_UPDATERTYPE_NAME);
            });
            Assert.DoesNotThrow(() =>
            {
                _statusService.MarkAsFailed(TEST_PROVIDER_NAME, TEST_UPDATERTYPE_NAME);
            });
            Assert.DoesNotThrow(() =>
            {
                _statusService.SetStatusFor(TEST_PROVIDER_NAME, TEST_UPDATERTYPE_NAME, UpdaterStatus.RanSuccessfully);
            });
            _statusService.SetStatusFor(TEST_PROVIDER_NAME, TEST_UPDATERTYPE_NAME, UpdaterStatus.Idle);
            Assert.Pass();
        }

        [Test]
        public void UniquenessTest()
        {
            var groups = _statusService.GetAllStatuses().GroupBy(x => x.Updater + x.UpdaterType);
            if (groups.Any(x => x.Count() > 1))
            {
                Assert.Fail("Multiple entries for the same updater found", groups.Where(x => x.Count() > 1));
            }
            Assert.Pass();
        }

        [Test]
        public void StatusSetTest()
        {
            _statusService.SetStatusFor(TEST_PROVIDER_NAME, TEST_UPDATERTYPE_NAME, TEST_STATUS);
            Assert.That(_statusService.GetStatusFor(TEST_PROVIDER_NAME, TEST_UPDATERTYPE_NAME)?.Status, Is.EqualTo(TEST_STATUS.ToString()));
            Assert.Pass();
        }

        [Test]
        public void IComparableTest()
        {
            _statusService.SetStatusFor(TEST_PROVIDER_NAME, TEST_UPDATERTYPE_NAME, TEST_STATUS);
            Assert.IsTrue(_statusService.GetStatusFor(TEST_PROVIDER_NAME, TEST_UPDATERTYPE_NAME) == TEST_STATUS);
            Assert.Pass();
        }
    }
}