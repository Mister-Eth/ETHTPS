
namespace ETHTPS.Data.Core
{
    public enum TimeInterval { [GroupBy(TimeGrouping.Second)] Instant, [GroupBy(TimeGrouping.Second)] OneMinute, [GroupBy(TimeGrouping.Minute)] OneHour, [GroupBy(TimeGrouping.Hour)] OneDay, [GroupBy(TimeGrouping.Day)] OneWeek, [GroupBy(TimeGrouping.Day)] OneMonth, [GroupBy(TimeGrouping.Month)] OneYear, [GroupBy(TimeGrouping.Year)] All }
    public enum TimeGrouping { Second, Minute, Hour, Day, Week, DayOfWeek, Month, Year, Decade }
    public enum DataType { TPS, GPS, GasAdjustedTPS }
}
