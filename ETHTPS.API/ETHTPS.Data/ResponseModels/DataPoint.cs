using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Data.ResponseModels
{
    public class DataPoint
    {
        public DateTime Date { get; set; }
        public double Value { get; set; }
    }
}
