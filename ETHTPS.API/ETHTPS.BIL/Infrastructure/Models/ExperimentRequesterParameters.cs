using ETHTPS.Data.Models;

namespace ETHTPS.API.BIL.Infrastructure.Models
{
    public class ExperimentRequesterParameters
        : APIKeyRequestModel
    {
        public string DeviceType { get; set; }
    }
}
