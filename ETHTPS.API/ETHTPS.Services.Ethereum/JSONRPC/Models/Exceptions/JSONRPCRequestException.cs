using System;

namespace ETHTPS.Services.Ethereum.JSONRPC.Models.Exceptions
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
