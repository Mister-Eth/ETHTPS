using ETHTPS.API.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.TPSProviders
{
    public interface ITPSProvider
    {
        Task<IEnumerable<TPSResponseModel>> GetTPSAsync(TimeInterval interval);
        string Name { get; }
    }

    public enum TimeInterval { OneMinute, FifteenMinutes, OneHour, OneDay, OneWeek, OneMonth }
}
