using ETHTPS.Data.Core.Models.DataPoints.XYPoints;

using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace ETHTPS.Data.Core.Models.ResponseModels.L2s
{
    public class SimpleMultiDatasetAnalysis : DatasetAnalysisBase
    {
        public SimpleMultiDatasetAnalysis(IEnumerable<Dataset> datasets)
        {
            if (datasets
                   != null && datasets.Any(x => x.DataPoints?.Count() > 0))
            {
                var _1Dset = datasets.Select(x => x.SimpleAnalysis);

                var maxSet = _1Dset.MaxBy(x => x.Max.ToDatedXYDataPoint().Y);
                var max = maxSet.Max.ToDatedXYDataPoint();
                Max = new ProviderDatedXYDataPoint(max.X, max.Y, datasets.FirstOrDefault(x => x.SimpleAnalysis.Max.Y == max.Y)?.Provider);

                var minSet = _1Dset.MinBy(x => x.Min.ToDatedXYDataPoint().Y);
                var min = minSet.Min.ToDatedXYDataPoint();
                Min = new ProviderDatedXYDataPoint(min.X, min.Y, datasets.FirstOrDefault(x => x.SimpleAnalysis.Min.Y == min.Y)?.Provider);

                Mean = _1Dset.Select(x => x.Mean).Average();
            }
        }

        public SimpleMultiDatasetAnalysis(IProviderXYMultiConvertible max, IProviderXYMultiConvertible min, double mean)
        {
            Max = max;
            Min = min;
            Mean = mean;
        }

        public IProviderXYMultiConvertible Max { get; private set; }
        public IProviderXYMultiConvertible Min { get; private set; }
        public double Mean { get; private set; }
    }
}
