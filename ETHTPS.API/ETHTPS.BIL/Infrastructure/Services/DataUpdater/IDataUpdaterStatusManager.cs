using ETHTPS.API.BIL.Infrastructure.Models.DataUpdater;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater
{
    public interface IDataUpdaterStatusManager : IDataUpdaterStatusGetter
    {
        LiveUpdaterStatus SetStatusFor(string provider, string status);
    }
}
