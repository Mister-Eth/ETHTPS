using ETHTPS.Data.Core.Models.DataUpdater;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.ProviderSpecific
{
    public interface IProviderDataUpdaterStatusService : IDataUpdaterStatusService, IProviderDataUpdaterStatusManager, IProviderDataUpdaterManager
    {
        IProviderTypeDataUpdaterStatusService MakeUpdaterSpecific(UpdaterType type);
    }
}
