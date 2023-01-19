using ETHTPS.Data;
using ETHTPS.Data.Models.Query;

using System.Collections.Generic;

namespace ETHTPS.API.Infrastructure.Services
{
    /// <summary>
    /// Represents a (p)er-(s)econd controller. This interface is used for making sure both TPS and GPS controller methods always return the same types.
    /// </summary>
    /// <typeparam name="TDataPoint"></typeparam>
    /// <typeparam name="TResponseModel"></typeparam>
    public interface IPSController<TDataPoint, TResponseModel>
    {
        IDictionary<string, TDataPoint> Max(ProviderQueryModel model);
        IDictionary<string, IEnumerable<TDataPoint>> Instant(ProviderQueryModel model);
        IDictionary<string, IEnumerable<TResponseModel>> Get(ProviderQueryModel model, string interval);
        IDictionary<string, IEnumerable<TResponseModel>> Get(ProviderQueryModel model, TimeInterval interval);
        IDictionary<string, IEnumerable<TResponseModel>> GeMonthlyDataByYear(ProviderQueryModel model, int year);
    }
}
