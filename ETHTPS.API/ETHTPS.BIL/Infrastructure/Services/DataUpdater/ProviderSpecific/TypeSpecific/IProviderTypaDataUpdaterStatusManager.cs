using ETHTPS.Data.Core.Models.DataUpdater;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.ProviderSpecific
{
    public interface IProviderTypaDataUpdaterStatusManager : IProviderTypeDataUpdaterStatusGetter, IProviderDataUpdaterStatusManager
    {
        void SetStatusFor(UpdaterStatus status) => SetStatusFor(UpdaterType, status);
        void MarkAsRunning() => MarkAsRunning(ProviderName, UpdaterType);
        void MarkAsRanSuccessfully() => MarkAsRanSuccessfully(ProviderName, UpdaterType);
        void MarkAsFailed() => MarkAsFailed(ProviderName, UpdaterType);
    }
}
