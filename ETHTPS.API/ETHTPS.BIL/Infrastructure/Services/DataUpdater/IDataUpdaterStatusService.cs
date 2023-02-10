using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.ProviderSpecific;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater
{
    public interface IDataUpdaterStatusService : IDataUpdaterManager
    {
        IProviderDataUpdaterStatusService MakeProviderSpecific(string provider);
    }

}
