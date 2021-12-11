using ETHTPS.Data.ResponseModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.Services
{
    public interface IPSService : IPSController<DataPoint, DataResponseModel>
    {
    }
}
