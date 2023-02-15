using ETHTPS.Data.Core;
using ETHTPS.Data.Core.DataPoints.XYPoints.Attributes;

namespace ETHTPS.Data.Models.Queries.Data
{
    public class DataRequestModel : ProviderQueryModel
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public BucketOptions BucketOptions { get; set; } = new();
        public XPointType ReturnTypeXAxisType { get; set; } = XPointType.Date;
    }
}
