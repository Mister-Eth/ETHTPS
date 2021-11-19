using ETHTPS.Services.HistoricalDataLoggers.ChartLoggers;
using ETHTPS.Services.HistoricalDataLoggers.SpecialLoggers;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.HistoricalDataLoggers.Aggregation
{
    public class AggregatedDataLogger : IHistoricalDataLogger
    {
        private readonly OneHourChartDataLogger _oneHourChartLogger;
        private readonly OneDayChartLogger _oneDayChartLogger;
        private readonly OneWeekChartDataLogger _oneWeekChartLogger;
        private readonly OneMonthChartDataLogger _oneMonthChartLogger;
        private readonly LatestEntryDataLogger _latestEntryDataLogger;
        private readonly MaxEntryDataLogger _maxEntryDataLogger;

        public AggregatedDataLogger(OneHourChartDataLogger oneHourChartLogger, OneDayChartLogger oneDayChartLogger, OneWeekChartDataLogger oneWeekChartLogger, OneMonthChartDataLogger oneMonthChartLogger, LatestEntryDataLogger latestEntryDataLogger, MaxEntryDataLogger maxEntryDataLogger)
        {
            _oneHourChartLogger = oneHourChartLogger;
            _oneDayChartLogger = oneDayChartLogger;
            _oneWeekChartLogger = oneWeekChartLogger;
            _oneMonthChartLogger = oneMonthChartLogger;
            _latestEntryDataLogger = latestEntryDataLogger;
            _maxEntryDataLogger = maxEntryDataLogger;
        }

        public void AddOrUpdateEntry(TPSGPSInfo entry, int providerID)
        {
            _latestEntryDataLogger.AddOrUpdateEntry(entry, providerID);
            _maxEntryDataLogger.AddOrUpdateEntry(entry, providerID);
            _oneHourChartLogger.AddOrUpdateEntry(entry, providerID);
            _oneDayChartLogger.AddOrUpdateEntry(entry, providerID);
            _oneWeekChartLogger.AddOrUpdateEntry(entry, providerID);
            _oneMonthChartLogger.AddOrUpdateEntry(entry, providerID);
        }
    }
}
