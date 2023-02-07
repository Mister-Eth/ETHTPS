#nullable disable

using System;

namespace ETHTPS.Data.Integrations.MSSQL
{
    public partial class TpsandGasDataLatest : TPSAndGasDataBase, IEquatable<TimedTPSAndGasData>
    {
        public double Tps { get; set; }
        public double Gps { get; set; }

        public bool Equals(TimedTPSAndGasData other)
        {
           return other.AverageTps == Tps && other.AverageGps == Gps && other.Provider == Provider;
        }

        public static implicit operator TimedTPSAndGasData(TpsandGasDataLatest entry) => new()
        {
            AverageGps = entry.Gps,
            AverageTps = entry.Tps,
            Id = entry.Id,
            StartDate = DateTime.Now,
            ReadingsCount = 0
        };
    }
}
