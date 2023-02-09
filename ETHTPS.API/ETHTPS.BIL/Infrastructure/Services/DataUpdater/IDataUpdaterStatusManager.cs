namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater
{
    public interface IDataUpdaterStatusManager : IDataUpdaterStatusGetter
    {
        void SetStatusFor(string provider, string status, string updaterType);
    }
}
