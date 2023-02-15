using ETHTPS.Data.Core;

namespace ETHTPS.Data.Models.Queries.Data
{
    public class BucketOptions
    {
        public bool UseTimeBuckets { get; set; } = true;
        public TimeInterval BucketSize { get; set; } = TimeInterval.Auto;
        public TimeSpan? CustomBucketSize { get; set; }
    }
}
