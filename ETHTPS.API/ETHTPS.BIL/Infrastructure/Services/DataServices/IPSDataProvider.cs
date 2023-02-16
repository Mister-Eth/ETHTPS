using ETHTPS.Data;
using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;

using System.Collections.Generic;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataServices
{
    /// <summary>
    /// Represents a (p)er-(s)econd controller. This interface is used for making sure both TPS and GPS controller methods always return the same types.
    /// </summary>
    /// <typeparam name="TDataPoint"></typeparam>
    /// <typeparam name="TResponseModel"></typeparam>
    public interface IPSDataProvider<TDataPoint, TResponseModel>
    {
        IDictionary<string, TDataPoint> Max(ProviderQueryModel model);
        IDictionary<string, IEnumerable<TDataPoint>> Instant(ProviderQueryModel model);
        IDictionary<string, IEnumerable<TResponseModel>> Get(ProviderQueryModel model, TimeInterval interval);
        IDictionary<string, IEnumerable<TResponseModel>> GetMonthlyDataByYear(ProviderQueryModel model, int year);
    }
}
