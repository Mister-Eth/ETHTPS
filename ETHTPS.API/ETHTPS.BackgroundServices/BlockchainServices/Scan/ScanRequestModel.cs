using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Scan
{
    public class ScanRequestModel
    {
        public ScanRequestModel(string module, string action, string aPIKey)
        {
            Module = module;
            Action = action;
            APIKey = aPIKey;
        }

        public string Module { get; private set; }
        public string Action { get; private set; }
        public string APIKey { get; private set; }
    }
}
