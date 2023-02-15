using ETHTPS.Data.Core;

namespace ETHTPS.Data.Models.Queries
{
    /// <summary>
    /// Represents a filtering model based on a provider, network and whether to include sidechains. Also has an APIKey property.
    /// </summary>
    public class ProviderQueryModel : APIKeyRequestModel
    {
        public string Provider { get; set; } = Constants.All;
        public string Network { get; set; } = Constants.Mainnet;
        public bool IncludeSidechains { get; set; } = true;

        public static ProviderQueryModel FromProviderName(string provider) => new ProviderQueryModel()
        {
            Provider = provider
        };

        public static ProviderQueryModel All => new ProviderQueryModel()
        {
            Provider = Constants.All
        };
    }
}
