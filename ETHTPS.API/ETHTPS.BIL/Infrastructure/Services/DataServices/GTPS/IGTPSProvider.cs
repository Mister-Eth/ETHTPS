using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.DataPoints;
using ETHTPS.Data.Core;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataServices.GTPS
{
    public interface IGTPSProvider
    {
        List<DataResponseModel> GetGTPS(ProviderQueryModel requestModel, TimeInterval interval);
    }
}
