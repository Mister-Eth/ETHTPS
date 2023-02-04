using ETHTPS.Data.Models;

namespace ETHTPS.API.Core.Infrastructure.Services.Experimentation
{
    public class ExperimentRequesterParameters
        : APIKeyRequestModel
    {
        public string DeviceType { get; set; }
    }
}
