namespace ETHTPS.Data.Core.Models.ResponseModels.L2s
{
    public interface IAnalysisParameters
    {
        /// <summary>
        /// Whether to include basic data analysis such as min, max, average in the result
        /// </summary>
        public bool IncludeSimpleAnalysis { get; set; }

        /// <summary>
        /// Whether to include more complex analysis in the result
        /// </summary>
        public bool IncludeComplexAnalysis { get; set; }
    }
}
