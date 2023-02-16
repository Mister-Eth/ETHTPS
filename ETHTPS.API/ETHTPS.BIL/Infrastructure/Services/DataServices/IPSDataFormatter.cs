using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.DataPoints;
using ETHTPS.Data.Core.Models.DataPoints.XYPoints;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataServices
{
    public interface IPSDataFormatter
    {
        IEnumerable<TOutDataPoint> Convert<TInDataPoint, TOutDataPoint>(IEnumerable<TInDataPoint> data)
            where TOutDataPoint : IXYMultiConvertible;

        IDictionary<DataType, IEnumerable<IXYMultiConvertible>> Format(List<DataResponseModel> source, DataRequestModel requestModel);
    }
}
