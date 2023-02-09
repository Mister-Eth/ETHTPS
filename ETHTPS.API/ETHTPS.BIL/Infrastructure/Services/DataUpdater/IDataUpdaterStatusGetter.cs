using ETHTPS.API.BIL.Infrastructure.Models.DataUpdater;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater
{
    public interface IDataUpdaterStatusGetter
    {
        IEnumerable<string> GetAllStatuses();
        LiveUpdaterStatus GetStatusFor(string provider);
    }
}
