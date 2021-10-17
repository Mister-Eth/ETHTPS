using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Data.Extensions.StringExtensions
{
    public static class StringExtensions
    {
        public static string AggregateToLowercase(params object[] args)
        {
            return string.Join('-', args.Select(x => x.ToString().ToLower()));
        }
    }
}
