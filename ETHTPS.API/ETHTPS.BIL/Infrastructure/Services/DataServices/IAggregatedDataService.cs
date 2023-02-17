using ETHTPS.API.BIL.Infrastructure.Services.DataServices.GPS;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.GTPS;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.TPS;
using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.DataPoints.XYPoints;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.DataPoints;
using ETHTPS.Data.Core.Models.ResponseModels.L2s;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataServices
{
    public interface IAggregatedDataService : ITPSProvider, IGPSProvider, IGTPSProvider
    {
        List<DataResponseModel> GetData(L2DataRequestModel requestModel, DataType dataType, TimeInterval interval);
        L2DataResponseModel GetData(L2DataRequestModel requestModel, DataType dataType, IPSDataFormatter formatter);
    }
}
