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

        public static int IndexOfOccurence(this string s, string match, int occurence)
        {
            int i = 1;
            int index = 0;

            while (i <= occurence && (index = s.IndexOf(match, index + 1)) != -1)
            {
                if (i == occurence)
                    return index;

                i++;
            }

            return -1;
        }
    }
}
