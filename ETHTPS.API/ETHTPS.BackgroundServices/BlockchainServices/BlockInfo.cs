using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices
{
    public class BlockInfo
    {
        public int BlockNumber { get; set; }
        public int TransactionCount { get; set; }
        public int GasUsed { get; set; }
    }
}
