using ETHTPS.Data.Core;

namespace ETHTPS.Data.Core.Models.Queries.Data.Requests
{
    /// <summary>
    /// Represents a filtering model based on a provider, network and whether to include sidechains. Also has an APIKey property.
    /// </summary>
    public class ProviderQueryModel
    {
        public string Provider { get; set; }
        public string Network { get; set; } = Constants.Mainnet;
        public bool IncludeSidechains { get; set; } = true;

        public static ProviderQueryModel FromProviderName(string provider) => new()
        {
            Provider = provider
        };

        public static ProviderQueryModel All => new()
        {
            Provider = Constants.All
        };
    }
}
