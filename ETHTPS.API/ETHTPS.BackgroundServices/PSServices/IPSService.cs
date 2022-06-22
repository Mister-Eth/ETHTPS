using ETHTPS.Data;
using ETHTPS.Data.Models.Query;
using ETHTPS.Data.ResponseModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Services.PSServices
{
    public interface IPSService : IPSController<DataPoint, DataResponseModel>
    {
        IDictionary<string, IEnumerable<DataResponseModel>> IPSController<DataPoint, DataResponseModel>.Get(ProviderQueryModel model, TimeInterval interval) => Get(model, interval.ToString());
    }
}