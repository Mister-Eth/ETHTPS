using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Scan.Extensions
{
    public static class QueryStringExtensions
    {
        public static string ToQueryString<T>(this T requestModel)
            where T: ScanRequestModel
        {
            var props = typeof(T).GetProperties();
            return "?" + string.Join("&", props.Select(x => x.Name + "=" + x.GetValue(requestModel)));
        }
    }
}
