using ETHTPS.Data.Core.Models.DataPoints.XYPoints;

using System.Collections.Generic;

namespace ETHTPS.Data.Core.Models.ResponseModels.L2s
{
    public class Dataset
    {
        public Dataset(IEnumerable<IXYMultiConvertible> dataPoints, string provider, bool simpleDatasetAnalysisIncluded, bool complexDatasetAnalysisIncluded)
        {
            if (simpleDatasetAnalysisIncluded)
                SimpleAnalysis = new(dataPoints);
            if (complexDatasetAnalysisIncluded)
                ComplexAnalysis = new(dataPoints);
            DataPoints = dataPoints;
            Provider = provider;
        }

        public IEnumerable<IXYMultiConvertible> DataPoints { get; set; }
        public string Provider { get; set; }
        public SimpleDatasetAnalysis? SimpleAnalysis { get; private set; }
        public ComplexDatasetAnalysis? ComplexAnalysis { get; private set; }
    }
}
