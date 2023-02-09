using ETHTPS.API.BIL.Infrastructure.Models.DataUpdater;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater
{
    public interface IDataUpdaterStatusGetter
    {
        IEnumerable<string> GetAllStatuses();
        IEnumerable<LiveUpdaterStatus> GetStatusFor(string provider);
        LiveUpdaterStatus? GetStatusFor(string provider, string updaterType);
    }
}
