using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Models
{
    public class TPSGPSOCLH
    {
        public TPSGPSOCLH() 
        {
            TPS = new OCLH();
            GPS = new OCLH();
        }

        public TPSGPSOCLH(double tps, double gps)
        {
            TPS = new OCLH(tps);
            GPS = new OCLH(gps);
        }
        public OCLH TPS { get; set; }
        public OCLH GPS { get; set; }
        public DateTime Date { get; set; }
    }
}
