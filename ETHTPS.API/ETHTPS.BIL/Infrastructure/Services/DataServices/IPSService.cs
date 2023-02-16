using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.DataPoints;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataServices
{
    public interface IPSService : IPSDataProvider<DataPoint, DataResponseModel>
    {
        IDictionary<string, IEnumerable<DataResponseModel>> IPSDataProvider<DataPoint, DataResponseModel>.Get(ProviderQueryModel model, TimeInterval interval) => Get(model, interval);
    }
}