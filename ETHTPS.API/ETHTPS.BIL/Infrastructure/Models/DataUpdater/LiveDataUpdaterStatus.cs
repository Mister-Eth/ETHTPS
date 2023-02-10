using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;

namespace ETHTPS.API.BIL.Infrastructure.Models.DataUpdater
{
    public class LiveUpdaterStatus : IComparable<UpdaterStatus>, IEquatable<UpdaterStatus>
    {
        public string Updater { get; set; }
        public string Status { get; set; }
        public string UpdaterType { get; set; }
        public DateTime? LastSuccessfulRunTime { get; set; }
        public int NumberOfSuccesses { get; set; }
        public int NumberOfFailures { get; set; }

        public int CompareTo(UpdaterStatus other) => Status.CompareTo(other.ToString());
        public bool Equals(UpdaterStatus other) => this == other;
        public static bool operator ==(LiveUpdaterStatus? status, UpdaterStatus other) => status?.Status == other.ToString();
        public static bool operator !=(LiveUpdaterStatus? status, UpdaterStatus other) => !(status == other);
    }
}
