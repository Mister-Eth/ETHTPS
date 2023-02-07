using ETHTPS.Data.Core;
using ETHTPS.Data.Models.Query;
using ETHTPS.Data.ResponseModels;

namespace ETHTPS.API.BIL.Infrastructure.Services
{
    public interface IPSService : IPSController<DataPoint, DataResponseModel>
    {
        IDictionary<string, IEnumerable<DataResponseModel>> IPSController<DataPoint, DataResponseModel>.Get(ProviderQueryModel model, TimeInterval interval) => Get(model, interval.ToString());
    }
}