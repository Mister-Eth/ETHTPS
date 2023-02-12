using System;

namespace ETHTPS.Data.Core.Extensions
{
    public static class AttributeExtensions
    {
        /// <summary>
        /// Returns the <see cref="TimeInterval"/> that is associated with this value or throws an exception if one was not found
        /// </summary>
        public static TimeGrouping ExtractTimeGrouping(this TimeInterval timeInterval) => timeInterval.GetAttribute<GroupByAttribute>().Grouping;

        /// <summary>
        /// https://stackoverflow.com/a/19621488
        /// </summary>
        public static T GetAttribute<T>(this Enum value) where T : Attribute
        {
            var type = value.GetType();
            var memberInfo = type.GetMember(value.ToString());
            var attributes = memberInfo[0].GetCustomAttributes(typeof(T), false);
            return attributes.Length > 0
              ? (T)attributes[0]
              : null;
        }
    }
}
