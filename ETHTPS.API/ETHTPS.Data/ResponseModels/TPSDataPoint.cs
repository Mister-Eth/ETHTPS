using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Data.ResponseModels
{
    public class TPSDataPoint
    {
        public DateTime Date { get; set; }
        public double TPS { get; set; }
    }
}
