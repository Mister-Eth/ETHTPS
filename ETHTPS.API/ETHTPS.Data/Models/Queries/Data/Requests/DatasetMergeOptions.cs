namespace ETHTPS.Data.Core.Models.Queries.Data.Requests
{
    /// <summary>
    /// A lot of datasets can make charts look ugly so we need to be able to merge some of them together. This class is used for specifying how, if applicable, datasets will be merged.
    /// </summary>
    public class DatasetMergeOptions
    {
        /// <summary>
        /// Merge datasets until they represent, at most, this percentage out of the global dataset mean.
        /// </summary>
        public int? MergePercentage { get; set; }
        public int? MaxCount { get; set; }
    }
}
