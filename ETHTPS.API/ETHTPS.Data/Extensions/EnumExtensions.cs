using System;
using System.Diagnostics;
using System.Linq;
using System.Reflection;

namespace ETHTPS.Data.Core.Extensions
{
    /// <summary>
    /// https://stackoverflow.com/a/9276348
    /// </summary>
    public static class EnumExtensions
    {
        /// <summary>
        /// Gets an attribute on an enum field value
        /// </summary>
        /// <typeparam name="T">The type of the attribute you want to retrieve</typeparam>
        /// <param name="enumVal">The enum value</param>
        /// <returns>The attribute of type T that exists on the enum value</returns>
        /// <example><![CDATA[string desc = myEnumVariable.GetAttributeOfType<DescriptionAttribute>().Description;]]></example>
        public static T GetAttributeOfType<T>(this Enum enumVal) where T : System.Attribute
        {
            var type = enumVal.GetType();
            var memInfo = type.GetMember(enumVal.ToString());
            var attributes = memInfo[0].GetCustomAttributes(typeof(T), false);
            return (attributes.Length > 0) ? (T)attributes[0] : null;
        }

        /// <summary>
        /// https://stackoverflow.com/a/4877704
        /// </summary>
        public static Expected GetAttributeValue<T, Expected>(this Enum enumeration, Func<T, Expected> expression)
    where T : Attribute
        {
            T attribute =
              enumeration
                .GetType()
                .GetMember(enumeration.ToString())
                .Where(member => member.MemberType == MemberTypes.Field)
                .FirstOrDefault()
                .GetCustomAttributes(typeof(T), false)
                .Cast<T>()
                .SingleOrDefault();

            if (attribute == null)
                return default(Expected);

            return expression(attribute);
        }

        public static TimeSpan ToTimeSpan(this TimeGrouping grouping)
        {
            return grouping switch
            {
                TimeGrouping.Second => TimeSpan.FromSeconds(1),
                TimeGrouping.Minute => TimeSpan.FromSeconds(60),
                TimeGrouping.Hour => TimeSpan.FromMinutes(60),
                TimeGrouping.Day => TimeSpan.FromHours(24),
                TimeGrouping.Week => TimeSpan.FromDays(7),
                TimeGrouping.Month => TimeSpan.FromDays(30),
                TimeGrouping.Year => TimeSpan.FromDays(365),
                TimeGrouping.Decade => TimeSpan.FromDays(3652),
                _ => throw new ArgumentOutOfRangeException($"No definition for {grouping}"),
            };
        }

        public static string ToFluxTimeUnit(this TimeSpan timeSpan)
        {
            if (timeSpan <= TimeGrouping.Minute.ToTimeSpan())
                return "s";
            if (timeSpan <= TimeGrouping.Hour.ToTimeSpan())
                return "m";
            if (timeSpan <= TimeGrouping.Day.ToTimeSpan())
                return "h";
            if (timeSpan <= TimeGrouping.Week.ToTimeSpan())
                return "d";
            if (timeSpan <= TimeGrouping.Month.ToTimeSpan())
                return "d";
            if (timeSpan <= TimeGrouping.Year.ToTimeSpan())
                return "mo";
            return "y";
        }
    }
}
