using ETHTPS.Data.Core.Models.DataUpdater;

namespace ETHTPS.Data.ResponseModels
{
    public class ProviderResponseModel
    {
        public string Name { get; set; }
        public string Color { get; set; }
        public int TheoreticalMaxTPS { get; set; }
        public string Type { get; set; }
        public bool IsGeneralPurpose { get; set; }
        public string? IsSubchainOf { get; set; }
        public IBasicLiveUpdaterStatus? Status { get; set; }
    }
}
