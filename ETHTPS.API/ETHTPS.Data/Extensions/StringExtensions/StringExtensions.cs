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

        public static string RemoveAllNonNumericCharacters(this string source) => new(source.Where(c => char.IsNumber(c) || c == '.').ToArray());

        public static string UntilParanthesis(this string source)
        {
            if (source.Contains("("))
            {
                source = source.Substring(0, source.IndexOf("("));
            }
            return source;
        }

        public static string BetweenParantheses(this string source) => Between(source, "(", ")");

        public static string Between(this string STR, string FirstString, string LastString)
        {
            string FinalString;
            int Pos1 = STR.IndexOf(FirstString) + FirstString.Length;
            int Pos2 = STR.IndexOf(LastString);
            FinalString = STR.Substring(Pos1, Pos2 - Pos1);
            return FinalString;
        }
    }
}
