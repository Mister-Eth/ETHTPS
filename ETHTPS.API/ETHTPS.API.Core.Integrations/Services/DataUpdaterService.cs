using ETHTPS.API.BIL.Infrastructure.Models.DataUpdater;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;

namespace ETHTPS.API.Core.Integrations.MSSQL.Services
{
    public class DataUpdaterService : IDataUpdaterService
    {
        public IEnumerable<string> GetAllStatuses()
        {
            throw new NotImplementedException();
        }

        public LiveUpdaterStatus GetStatusFor(string provider)
        {
            throw new NotImplementedException();
        }

        public void IncrementNumberOfFailures(string provider)
        {
            throw new NotImplementedException();
        }

        public void IncrementNumberOfSuccesses(string provider)
        {
            throw new NotImplementedException();
        }

        public void MarkAsRanSuccessfully()
        {
            throw new NotImplementedException();
        }

        public LiveUpdaterStatus SetStatusFor(string provider, string status)
        {
            throw new NotImplementedException();
        }
    }
}
