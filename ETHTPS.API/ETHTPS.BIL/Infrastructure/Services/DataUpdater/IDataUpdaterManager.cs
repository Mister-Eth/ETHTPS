namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater
{
    public interface IDataUpdaterManager
    {
        void IncrementNumberOfSuccesses(string provider, string updaterType);
        void IncrementNumberOfFailures(string provider, string updaterType);
        void MarkAsRanSuccessfully(string provider, string updaterType);
    }
}
