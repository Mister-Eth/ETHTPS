using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.DataPoints;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataServices.GTPS
{
    public interface IGTPSProvider
    {
        DataResponseModel GetGTPS(DataRequestModel requestModel);
    }
}
