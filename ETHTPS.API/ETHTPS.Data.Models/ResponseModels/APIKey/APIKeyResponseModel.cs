using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.ResponseModels.APIKey
{
    public class APIKeyResponseModel
    {
        public string Key { get; set; }
        public int RequestLimit24h { get; set; }
        public string RequesterIP { get; set; }
    }
}
