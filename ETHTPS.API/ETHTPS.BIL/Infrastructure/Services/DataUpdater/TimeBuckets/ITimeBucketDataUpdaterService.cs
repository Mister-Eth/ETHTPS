using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.Data.Core.Models.DataEntries.BlockchainServices.Models;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.TimeBuckets
{
    public interface ITimeBucketDataUpdaterService<T>
        where T: IBlockInfoProvider
    {
        void UpdateAllEntries(TPSGPSInfo entry);
        void UpdateLatestEntries(TPSGPSInfo entry);
        void UpdateMaxEntry(TPSGPSInfo entry);
        void AddOrUpdateMinuteTPSEntry(TPSGPSInfo entry);
        void AddOrUpdateHourTPSEntry(TPSGPSInfo entry);
        void AddOrUpdateDayTPSEntry(TPSGPSInfo entry);
        void AddOrUpdateWeekTPSEntry(TPSGPSInfo entry);
        void AddOrUpdateMonthTPSEntry(TPSGPSInfo entry);
        void AddOrUpdateYearTPSEntry(TPSGPSInfo entry);
        void AddOrUpdateAllTPSEntry(TPSGPSInfo entry);
    }
}
