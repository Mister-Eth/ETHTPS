using ETHTPS.Data.Core.Models.DataUpdater;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater
{
    public interface IDataUpdaterStatusGetter
    {
        IEnumerable<LiveUpdaterStatus> GetAllStatuses();
        IEnumerable<LiveUpdaterStatus> GetStatusFor(string provider);
        LiveUpdaterStatus? GetStatusFor(string provider, UpdaterType updaterType);
        DateTime? GetLastRunTimeFor(string provider, UpdaterType updaterType);
        TimeSpan? GetTimeSinceLastRanFor(string provider, UpdaterType updaterType) => DateTime.Now - GetLastRunTimeFor(provider, updaterType);
    }
}
