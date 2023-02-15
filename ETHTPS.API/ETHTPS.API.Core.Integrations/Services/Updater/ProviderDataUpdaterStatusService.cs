using ETHTPS.Data.Core.Models.DataUpdater;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.ProviderSpecific;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.ProviderSpecific.TypeSpecific;

namespace ETHTPS.API.Core.Integrations.MSSQL.Services.Updater
{
    public class ProviderDataUpdaterStatusService : IProviderDataUpdaterStatusService
    {
        private readonly IDataUpdaterStatusService _statusService;

        public ProviderDataUpdaterStatusService(IDataUpdaterStatusService statusService, string provider)
        {
            _statusService = statusService;
            ProviderName = provider;
        }

        public static IProviderDataUpdaterStatusService From(IDataUpdaterStatusService statusService, string provider) => new ProviderDataUpdaterStatusService(statusService, provider);

        public string ProviderName { get; private set; }

        public IEnumerable<LiveUpdaterStatus> GetAllStatuses()
        {
            return _statusService.GetAllStatuses();
        }

        public IEnumerable<LiveUpdaterStatus> GetStatusFor(string provider)
        {
            return _statusService.GetStatusFor(provider);
        }

        public LiveUpdaterStatus? GetStatusFor(string provider, UpdaterType updaterType)
        {
            return _statusService.GetStatusFor(provider, updaterType);
        }

        public void IncrementNumberOfFailures(string provider, UpdaterType updaterType)
        {
            _statusService.IncrementNumberOfFailures(provider, updaterType);
        }

        public void IncrementNumberOfSuccesses(string provider, UpdaterType updaterType)
        {
            _statusService.IncrementNumberOfSuccesses(provider, updaterType);
        }

        public void MarkAsFailed(string provider, UpdaterType updaterType)
        {
            _statusService.MarkAsFailed(provider, updaterType);
        }

        public void MarkAsRanSuccessfully(string provider, UpdaterType updaterType)
        {
            _statusService.MarkAsRanSuccessfully(provider, updaterType);
        }

        public void MarkAsRunning(string provider, UpdaterType updaterType)
        {
            _statusService.MarkAsRunning(provider, updaterType);
        }

        public void SetStatusFor(string provider, UpdaterType updaterType, UpdaterStatus status)
        {
            _statusService.SetStatusFor(provider, updaterType, status);
        }

        public IProviderDataUpdaterStatusService MakeProviderSpecific(string provider) => From(this, provider);

        public IProviderTypeDataUpdaterStatusService MakeUpdaterSpecific(UpdaterType type) => ProviderTypeDataUpdaterStatusService.From(this, type);

        public DateTime? GetLastRunTimeFor(UpdaterType updaterType)
        {
            return _statusService.GetLastRunTimeFor(ProviderName, updaterType);
        }

        public DateTime? GetLastRunTimeFor(string provider, UpdaterType updaterType)
        {
           return _statusService.GetLastRunTimeFor(provider, updaterType);
        }
    }
}
