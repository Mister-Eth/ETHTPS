using ETHTPS.Data.Core.Models.DataUpdater;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.ProviderSpecific
{
    public interface IProviderDataUpdaterManager : IDataUpdaterManager, IProviderDataUpdaterStatusGetter
    {
        void IncrementNumberOfSuccesses(UpdaterType updaterType) => IncrementNumberOfSuccesses(ProviderName, updaterType);
        void IncrementNumberOfFailures(UpdaterType updaterType) => IncrementNumberOfFailures(ProviderName, updaterType);
    }
}
