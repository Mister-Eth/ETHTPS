using ETHTPS.Data;
using ETHTPS.Data.Models.Query;
using ETHTPS.Data.ResponseModels;

using System.Collections.Generic;

namespace ETHTPS.API.Core.Infrastructure.Services
{
    public interface IPSService : IPSController<DataPoint, DataResponseModel>
    {
        IDictionary<string, IEnumerable<DataResponseModel>> IPSController<DataPoint, DataResponseModel>.Get(ProviderQueryModel model, TimeInterval interval) => Get(model, interval.ToString());
    }
}