using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace ETHTPS.Data.Core.Extensions.StringExtensions
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

        public static bool LossyCompareTo(this string source, string reference) => source.Trim().ToUpper() == reference.Trim().ToUpper();

        public static string SHA256(this string value)
        {
            StringBuilder Sb = new StringBuilder();

#pragma warning disable SYSLIB0021 // Type or member is obsolete
            using (var hash = SHA256Managed.Create())
            {
                Encoding enc = Encoding.UTF8;
                Byte[] result = hash.ComputeHash(enc.GetBytes(value));

                foreach (Byte b in result)
                    Sb.Append(b.ToString("x2"));
            }
#pragma warning restore SYSLIB0021 // Type or member is obsolete

            return Sb.ToString().ToUpper();
        }
    }
}
