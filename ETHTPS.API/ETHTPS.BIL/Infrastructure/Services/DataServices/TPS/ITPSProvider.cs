using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.Queries.Responses;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataServices.TPS
{
    public interface ITPSProvider
    {
        DataResponseModel GetTPS(DataRequestModel requestModel);
    }
}
