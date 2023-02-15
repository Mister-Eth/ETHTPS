using ETHTPS.Data.Core;

using System;

namespace ETHTPS.Data.Core.Models.Queries.Data.Requests
{
    public class BucketOptions
    {
        public bool UseTimeBuckets { get; set; } = true;
        public TimeInterval BucketSize { get; set; } = TimeInterval.Auto;
        public TimeSpan? CustomBucketSize { get; set; }
    }
}
