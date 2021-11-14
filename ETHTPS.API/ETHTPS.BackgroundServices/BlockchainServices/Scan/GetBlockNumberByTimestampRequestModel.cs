using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Scan
{
    public class GetBlockNumberByTimestampRequestModel : ScanRequestModel
    {

        public string Closest { get; private set; } = "before";
        public long Timestamp { get; private set; }

        public GetBlockNumberByTimestampRequestModel(string apiKey, long timestamp) : base("block", "getblocknobytime", apiKey)
        {
            Timestamp = timestamp;
        }
    }
}
