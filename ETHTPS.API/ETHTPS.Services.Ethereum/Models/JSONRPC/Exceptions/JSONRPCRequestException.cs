using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
