using ETHTPS.API.BIL.Infrastructure.Services.DataServices;
using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.DataPoints;
using ETHTPS.Data.Core.Models.DataPoints.XYPoints;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.API.BIL.Infrastructure.Services
{
    public class DeedleTimeSeriesFormatter : IPSDataFormatter
    {
        public IEnumerable<TOutDataPoint> Convert<TInDataPoint, TOutDataPoint>(IEnumerable<TInDataPoint> data) where TOutDataPoint : IXYMultiConvertible
        {
            throw new NotImplementedException();
        }

        public IDictionary<DataType, IEnumerable<IXYMultiConvertible>> Format(List<DataResponseModel> source, DataRequestModel requestModel)
        {
            throw new NotImplementedException();
        }
    }
}
