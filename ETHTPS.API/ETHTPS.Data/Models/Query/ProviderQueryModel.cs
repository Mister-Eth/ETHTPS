namespace ETHTPS.Data.Models.Query
{
    public class ProviderQueryModel
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
