using ETHTPS.Data.Core.Models.DataPoints.XYPoints;

using System.Collections.Generic;
using System.Linq;

namespace ETHTPS.Data.Core.Models.ResponseModels.L2s
{
    public class SimpleDatasetAnalysis : DatasetAnalysisBase
    {
        public SimpleDatasetAnalysis(IEnumerable<IXYMultiConvertible> dataset) : base(dataset)
        {
            if (dataset.Any())
            {
                Max = dataset.MaxBy(x => x.ToDatedXYDataPoint().Y);
                Min = dataset.MinBy(x => x.ToDatedXYDataPoint().Y);
                Mean = dataset.Average(x => x.ToDatedXYDataPoint().Y);
            }
        }

        public SimpleDatasetAnalysis(IXYMultiConvertible max, IXYMultiConvertible min, double mean)
        {
            Max = max;
            Min = min;
            Mean = mean;
        }

        public IXYMultiConvertible Max { get; private set; }
        public IXYMultiConvertible Min { get; private set; }
        public double Mean { get; private set; }
    }
}
