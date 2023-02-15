using ETHTPS.Data.Core.Models.DataUpdater;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.ProviderSpecific
{
    public interface IProviderDataUpdaterStatusManager : IProviderDataUpdaterStatusGetter, IProviderDataUpdaterManager
    {
        void SetStatusFor(UpdaterType updaterType, UpdaterStatus status) => SetStatusFor(ProviderName, updaterType, status);
        void MarkAsRunning(UpdaterType updaterType)=> MarkAsRunning(ProviderName, updaterType);
        void MarkAsRanSuccessfully(UpdaterType updaterType)=>MarkAsRanSuccessfully(ProviderName, updaterType);
        void MarkAsFailed(UpdaterType updaterType)=>MarkAsFailed(ProviderName, updaterType);
    }
}
