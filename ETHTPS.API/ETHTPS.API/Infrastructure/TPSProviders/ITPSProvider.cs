using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.TPSProviders
{
    public interface ITPSProvider
    {
        Task<double> GetTPSAsync(TimeInterval interval);
    }

    public enum TimeInterval { OneMinute, FifteenMinutes, OneHour, OneDay, OneWeek, OneMonth }
}
