using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Starkware.API.Models
{
    public static class Products
    {
        public static string ImmutableX => "immutable";
        public static string Sorare => "sorare";
        public static string DiversiFi => "deversifi";
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
