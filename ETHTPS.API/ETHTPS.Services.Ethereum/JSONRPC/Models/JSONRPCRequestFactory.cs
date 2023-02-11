using System.Collections.Generic;

namespace ETHTPS.Services.Ethereum.JSONRPC.Models
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
