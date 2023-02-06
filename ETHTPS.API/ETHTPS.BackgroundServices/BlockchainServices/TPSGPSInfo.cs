using ETHTPS.Data.Core.Extensions;

using InfluxDB.Client.Writes;

using System;

namespace ETHTPS.Services.BlockchainServices
{
    public class TPSGPSInfo : IMeasurement
    {
        public int BlockNumber { get; set; }
        public DateTime Date { get; set; }
        public double TPS { get; set; }
        public double GPS { get; set; }

        public PointData ToMeasurement() =>
            PointData.Measurement("tpsgps")
                     .Tag("blocknumber", BlockNumber.ToString())
                     .Field("tps", this.TPS)
                     .Field("tps", this.GPS)
                     .Timestamp(Date.ToUnixTime(), InfluxDB.Client.Api.Domain.WritePrecision.Ms);
        public string ToLineProtocol() => ToMeasurement().ToLineProtocol();
    }
}
