using ETHTPS.Data.Core.Models.DataPoints.XYPoints;

using System.Collections.Generic;

namespace ETHTPS.Data.Core.Models.ResponseModels.L2s
{
    public abstract class DatasetAnalysisBase
    {
        protected readonly IEnumerable<IXYMultiConvertible> _dataset;
        protected DatasetAnalysisBase() { }
        protected DatasetAnalysisBase(IEnumerable<IXYMultiConvertible> dataset)
        {
            _dataset = dataset;
        }
    }
}
