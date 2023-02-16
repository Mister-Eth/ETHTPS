using ETHTPS.Data.Core.Models.DataPoints.XYPoints;

using System.Collections.Generic;

namespace ETHTPS.Data.Core.Models.ResponseModels.L2s
{
    public class L2DataResponseModel
    {
        public IEnumerable<IXYMultiConvertible> Data { get; set; }
        public DataType? DataType { get; set; } = null;
    }
}
