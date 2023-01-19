namespace ETHTPS.Services.Ethereum.Starkware.API.Models
{
    public static class Products
    {
        public static string ImmutableX => "immutable";
        public static string Sorare => "sorare";
        public static string DeversiFi => "deversifi";
    }

    public static class TransactionTypes
    {
        public static string ConditionalTransfer => "CONDITIONAL_TRANSFER";
        public static string Deposit => "DEPOSIT";
        public static string Mint => "MINT";
        public static string Settlement => "SETTLEMENT";
        public static string Transfer => "TRANSFER";
        public static string Withdrawal => "WITHDRAWAL";
        public static string All => "_all";
    }
}
