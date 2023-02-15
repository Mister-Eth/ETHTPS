using ETHTPS.API.BIL.Infrastructure.Services.DataServices.GPS;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.GTPS;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.TPS;
using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.Queries.Responses;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataServices
{
    public interface IAggregatedDataService : ITPSProvider, IGPSProvider, IGTPSProvider
    {
        DataResponseModel GetData(DataRequestModel requestModel, DataType dataType);
    }
}
