using ETHTPS.Data.Core.Models.DataPoints.XYPoints;

using System.Collections.Generic;

namespace ETHTPS.Data.Core.Models.ResponseModels.L2s
{
    public sealed class ComplexDatasetAnalysis : SimpleDatasetAnalysis
    {
        public ComplexDatasetAnalysis(IEnumerable<IXYMultiConvertible> dataset) : base(dataset)
        {
        }
    }
}
