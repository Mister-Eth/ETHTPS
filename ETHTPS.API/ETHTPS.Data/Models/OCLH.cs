using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Models
{
    public class OCLH
    {
        public OCLH() { }

        public OCLH(double commonValue)
        {
            Open = Close = Low = High = commonValue;
        }

        public double Open { get; set; }
        public double Close { get; set; }
        public double Low { get; set; }
        public double High { get; set; }
    }
}
