
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

using System;

namespace ETHTPS.Data.Core
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum TimeInterval
    {
        [GroupBy(TimeGrouping.Second)] Instant,
        [GroupBy(TimeGrouping.Second)] OneMinute,
        [GroupBy(TimeGrouping.Minute)] OneHour,
        [GroupBy(TimeGrouping.Hour)] OneDay,
        [GroupBy(TimeGrouping.Day)] OneWeek,
        [GroupBy(TimeGrouping.Day)] OneMonth,
        [GroupBy(TimeGrouping.Month)] OneYear,
        [GroupBy(TimeGrouping.Year)] All,
        [GroupBy(TimeGrouping.Auto)] Auto
    }

    [JsonConverter(typeof(StringEnumConverter))]
    public enum TimeGrouping
    {
        Second,
        Minute,
        Hour,
        Day,
        Week,
        DayOfWeek,
        Month,
        Year,
        Decade,
        Auto
    }

    [JsonConverter(typeof(StringEnumConverter))]
    public enum DataType
    {
        TPS, GPS, GasAdjustedTPS
    }
}
