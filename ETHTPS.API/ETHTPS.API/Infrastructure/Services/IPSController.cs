using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.Services
{
    /// <summary>
    /// Represents a (p)er-(s)econd controller. This interface is used for making sure both TPS and GPS controller methods always return the same types.
    /// </summary>
    /// <typeparam name="TDataPoint"></typeparam>
    /// <typeparam name="TResponseModel"></typeparam>
    public interface IPSController<TDataPoint, TResponseModel>
    {
        IDictionary<string, TDataPoint> Max(string provider, string network = "Mainnet");
        IDictionary<string, IEnumerable<TDataPoint>> Instant(bool includeSidechains = true);
        IDictionary<string, IEnumerable<TResponseModel>> Get(string provider, string interval, string network = "Mainnet", bool includeSidechains = true);
        public IDictionary<string, IEnumerable<TResponseModel>> GeMonthlyDataByYear(string provider, int year, string network = "Mainnet", bool includeSidechains = true);
    }
}
