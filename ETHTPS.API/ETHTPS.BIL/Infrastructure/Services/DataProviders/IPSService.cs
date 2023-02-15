using ETHTPS.Data.Core;
using ETHTPS.Data.Models.Queries;
using ETHTPS.Data.Models.ResponseModels.DataPoints;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataProviders
{
    public interface IPSService : IPSDataProvider<DataPoint, DataResponseModel>
    {
        IDictionary<string, IEnumerable<DataResponseModel>> IPSDataProvider<DataPoint, DataResponseModel>.Get(ProviderQueryModel model, TimeInterval interval) => Get(model, interval.ToString());
    }
}