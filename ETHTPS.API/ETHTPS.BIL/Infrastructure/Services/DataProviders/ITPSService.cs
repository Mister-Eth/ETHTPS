using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.Queries.Responses;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataProviders
{
    public interface ITPSService : IPSService
    {
        public Task<DataResponseModel> GetTPSAsync(DataRequestModel requestModel);
    }
}
