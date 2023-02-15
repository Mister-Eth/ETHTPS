using ETHTPS.Data.Core.Models.DataPoints.XYPoints.Attributes;

using System;

namespace ETHTPS.Data.Core.Models.Queries.Data.Requests
{
    public class DataRequestModel : ProviderQueryModel
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public BucketOptions BucketOptions { get; set; } = new();
        public XPointType ReturnTypeXAxisType { get; set; } = XPointType.Date;
    }
}
