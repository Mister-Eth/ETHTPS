using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Status
{
    public class BlockInfoProviderStatusResult
    {
        [JsonConverter(typeof(StringEnumConverter))]
        public BlockInfoProviderStatus Status { get; set; }

        public string Details { get; set; }
    }
}
