using ETHTPS.Data.Core.Models.DataUpdater;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater
{
    public interface IDataUpdaterManager : IDataUpdaterStatusManager
    {
        void IncrementNumberOfSuccesses(string provider, UpdaterType updaterType);
        void IncrementNumberOfFailures(string provider, UpdaterType updaterType);
    }
}
