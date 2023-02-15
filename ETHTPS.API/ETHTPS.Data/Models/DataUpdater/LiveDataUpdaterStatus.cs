using System;

namespace ETHTPS.Data.Core.Models.DataUpdater
{
    public class LiveUpdaterStatus : IBasicLiveUpdaterStatus, IComparable<UpdaterStatus>, IEquatable<UpdaterStatus>
    {
        private const double UNRELIABILITY_RATIO_THRESHOLD = 1;
        public string Updater { get; set; }
        public string Status { get; set; }
        public string UpdaterType { get; set; }
        public DateTime? LastSuccessfulRunTime { get; set; }
        public int NumberOfSuccesses { get; set; }
        public int NumberOfFailures { get; set; }
        public bool IsUnreliable
        {
            get
            {
                if (NumberOfFailures == 0 && NumberOfSuccesses > 0)
                    return false;
                if (NumberOfFailures == 0)
                    return false;
                return (NumberOfSuccesses / NumberOfFailures) < UNRELIABILITY_RATIO_THRESHOLD;
            }
        }
        public bool IsProbablyDown
        {
            get
            {
                if (LastSuccessfulRunTime == null)
                    return true;

                return (DateTime.Now - LastSuccessfulRunTime.Value).TotalMinutes > 60;
            }
        }
        public int CompareTo(UpdaterStatus other) => Status.CompareTo(other.ToString());
        public bool Equals(UpdaterStatus other) => this == other;
        public static bool operator ==(LiveUpdaterStatus? status, UpdaterStatus other) => status?.Status == other.ToString();
        public static bool operator !=(LiveUpdaterStatus? status, UpdaterStatus other) => !(status == other);
    }
}
