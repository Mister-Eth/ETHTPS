using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Frontend.Models
{
    public class ChartDataModel
    {
        public IList<ChartData> Data { get; set; } = new List<ChartData>();

        public void AddDataGrouping(string provider, IntervalDataGrouping chartData)
        {
            foreach(var x in Data)
            {
                if (x.Provider == provider) 
                {
                    x.Groups.Add(chartData);
                }
            }
        }
    }

    public class ChartData
    {
        public string Provider { get; set; }
        public IList<IntervalDataGrouping> Groups { get; set; } = new List<IntervalDataGrouping>();
    }

    public class IntervalDataGrouping
    {
        public string Interval { get; set; }

        public IList<DataPoint> Data { get; set; } = new List<DataPoint>();
    }

    public class DataPoint
    {
        public DateTime Date { get; set; }

        public double TPS { get; set; }
    }
}
