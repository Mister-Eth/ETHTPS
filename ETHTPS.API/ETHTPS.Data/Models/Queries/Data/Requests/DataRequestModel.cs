using ETHTPS.Data.Core.Extensions;
using ETHTPS.Data.Core.Models.DataPoints.XYPoints;

using System;

namespace ETHTPS.Data.Core.Models.Queries.Data.Requests
{
    public class DataRequestModel : ProviderQueryModel
    {
        public TimeInterval CorrespondingInterval
        {
            get
            {
                StartDate ??= DateTime.Now;
                EndDate ??= DateTime.Now;
                return (StartDate.Value - EndDate.Value).GetClosestInterval();
            }
        }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public BucketOptions BucketOptions { get; set; } = new();
        public XPointType ReturnTypeXAxisType { get; set; } = XPointType.Date;
        public ReturnCollectionType ReturnCollectionType { get; set; }
    }
}
