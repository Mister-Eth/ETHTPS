using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.DataPoints;
using ETHTPS.Data.Core.Models.DataPoints.XYPoints;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.ResponseModels.L2s;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataServices
{
    public interface IPSDataFormatter
    {
        public IEnumerable<Dataset> MakeEqualLength(IEnumerable<Dataset> datasets, XPointType targetType);

        IEnumerable<IXYMultiConvertible> Format(List<DataResponseModel> source, L2DataRequestModel requestModel);
    }
}
