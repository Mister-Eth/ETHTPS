using ETHTPS.API.BIL.Infrastructure.Models.DataUpdater;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.ProviderSpecific
{
    public interface IProviderTypeDataUpdaterStatusGetter : IProviderDataUpdaterStatusGetter
    {
        public UpdaterType UpdaterType { get; }
    }
}
