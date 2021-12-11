using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Models.JSONRPC
{
    public static class JSONRPCRequestFactory
    {
        public static JSONRPCRequestModel CreateGetBlockHeightRequest() => new JSONRPCRequestModel()
        {
            ID = 0,
            JsonRPC = "2.0",
            Method = "eth_blockNumber",
        };

        public static JSONRPCRequestModel CreateGetTransactionCountByBlockNumberRequest(string block) => new JSONRPCRequestModel()
        {
            ID = 0,
            JsonRPC = "2.0",
            Method = "eth_getBlockTransactionCountByNumber",
            Params = new List<object>()
            {
                block
            }
        };

        public static JSONRPCRequestModel CreateGetBlockByBlockNumberRequest(string block) => new JSONRPCRequestModel()
        {
            ID = 0,
            JsonRPC = "2.0",
            Method = "eth_getBlockByNumber",
            Params = new List<object>()
            {
                block, false
            }
        };
    }
}
