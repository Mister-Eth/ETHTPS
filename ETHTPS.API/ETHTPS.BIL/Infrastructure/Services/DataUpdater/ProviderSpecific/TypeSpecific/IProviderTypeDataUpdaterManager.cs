namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.ProviderSpecific
{
    public interface IProviderTypeDataUpdaterManager : IProviderDataUpdaterManager, IProviderTypeDataUpdaterStatusGetter
    {
        void IncrementNumberOfSuccesses() => IncrementNumberOfSuccesses(ProviderName, UpdaterType);
        void IncrementNumberOfFailures() => IncrementNumberOfFailures(ProviderName, UpdaterType);
    }
}
