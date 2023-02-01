using ETHTPS.Data.Models;

namespace ETHTPS.API.Infrastructure.Services.Experimentation
{
    public class ExperimentRequesterParameters
        : APIKeyRequestModel
    {
        public string DeviceType { get; set; }
    }
}
