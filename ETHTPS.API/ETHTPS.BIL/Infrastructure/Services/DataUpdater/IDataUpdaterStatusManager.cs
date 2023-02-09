using ETHTPS.API.BIL.Infrastructure.Models.DataUpdater;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater
{
    public interface IDataUpdaterStatusManager
    {
        IEnumerable<string> GetAllStatuses();
        LiveDataUpdaterStatus GetStatusFor(string provider);
        LiveDataUpdaterStatus SetStatusFor(string provider, string status);
    }
}
