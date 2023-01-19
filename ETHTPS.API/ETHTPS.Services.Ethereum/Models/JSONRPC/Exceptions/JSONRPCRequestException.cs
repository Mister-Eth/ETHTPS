using System;

namespace ETHTPS.Services.Ethereum.Models.JSONRPC.Exceptions
{
    public class JSONRPCRequestException : Exception
    {
        public JSONRPCRequestException() : base()
        {

        }

        public JSONRPCRequestException(string message) : base(message)
        {

        }
    }
}
