namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater
{
    public interface IDataUpdaterManager
    {
        void IncrementNumberOfSuccesses(string provider);
        void IncrementNumberOfFailures(string provider);
        void MarkAsRanSuccessfully();
    }
}
