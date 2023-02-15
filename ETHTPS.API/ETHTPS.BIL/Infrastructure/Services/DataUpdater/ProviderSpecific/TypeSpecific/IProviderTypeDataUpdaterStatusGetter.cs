using ETHTPS.Data.Core.Models.DataUpdater;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.ProviderSpecific
{
    public interface IProviderTypeDataUpdaterStatusGetter : IProviderDataUpdaterStatusGetter
    {
        public UpdaterType UpdaterType { get; }
        DateTime? GetLastRunTime();
        TimeSpan? GetTimeSinceLastRan() => DateTime.Now - GetLastRunTimeFor(ProviderName, UpdaterType);
    }
}
