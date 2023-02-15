using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.ProviderSpecific;
using ETHTPS.Data.Core.Models.DataUpdater;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater
{
    public interface IDataUpdaterStatusManager : IDataUpdaterStatusGetter
    {
        void SetStatusFor(string provider, UpdaterType updaterType, UpdaterStatus status);
        void MarkAsRunning(string provider, UpdaterType updaterType);
        void MarkAsRanSuccessfully(string provider, UpdaterType updaterType);
        void MarkAsFailed(string provider, UpdaterType updaterType);
    }
}
