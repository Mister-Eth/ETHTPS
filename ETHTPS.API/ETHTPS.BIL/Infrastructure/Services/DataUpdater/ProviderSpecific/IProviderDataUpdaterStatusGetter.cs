using ETHTPS.API.BIL.Infrastructure.Models.DataUpdater;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.ProviderSpecific
{
    public interface IProviderDataUpdaterStatusGetter : IDataUpdaterStatusGetter
    {
        string ProviderName { get; }
        IEnumerable<LiveUpdaterStatus> GetStatus() => GetStatusFor(ProviderName);
        LiveUpdaterStatus? GetStatusFor(UpdaterType updaterType) => GetStatusFor(ProviderName, updaterType);
    }
}
