using System;

namespace ETHTPS.Data.Core
{
    /// <summary>
    /// Specifies how data should be grouped when this is chosen
    /// </summary>
    [AttributeUsage(AttributeTargets.Field, AllowMultiple = false)]
    public class GroupByAttribute : Attribute
    {
        public TimeGrouping Grouping { get; private set; }

        public GroupByAttribute(TimeGrouping grouping)
        {
            Grouping = grouping;
        }
    }
}
