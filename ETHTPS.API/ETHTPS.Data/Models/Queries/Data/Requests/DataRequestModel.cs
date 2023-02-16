using ETHTPS.Data.Core.Extensions;
using ETHTPS.Data.Core.Models.DataPoints.XYPoints;

using Newtonsoft.Json;

using System;

namespace ETHTPS.Data.Core.Models.Queries.Data.Requests
{
    public class DataRequestModel : ProviderQueryModel
    {
        [JsonIgnore]
        public TimeInterval CorrespondingInterval
        {
            get
            {
                StartDate ??= DateTime.Now;
                EndDate ??= DateTime.Now;
                return (EndDate.Value - StartDate.Value).GetClosestInterval();
            }
        }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public BucketOptions BucketOptions { get; set; } = new();
        public XPointType ReturnTypeXAxisType { get; set; } = XPointType.Date;
        public ReturnCollectionType ReturnCollectionType { get; set; }
    }
}
