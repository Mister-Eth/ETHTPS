using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.Queries.Responses;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataServices.GPS
{
    public interface IGPSProvider
    {
        DataResponseModel GetGPS(DataRequestModel requestModel);
    }
}
