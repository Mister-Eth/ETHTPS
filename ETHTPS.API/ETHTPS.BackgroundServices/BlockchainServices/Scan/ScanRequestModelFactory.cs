using ETHTPS.Data.Extensions;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Scan
{
    public class ScanRequestModelFactory
    {
        private readonly string _apiKey;

        public ScanRequestModelFactory(string apiKey)
        {
            _apiKey = apiKey;
        }

        public GetBlockNumberByTimestampRequestModel CreateGetBlockNumberByTimestampRequest(DateTime time) => new(_apiKey, time.ToUnixTime());
    }
}
