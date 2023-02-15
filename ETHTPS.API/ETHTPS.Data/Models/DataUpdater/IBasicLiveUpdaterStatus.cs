namespace ETHTPS.Data.Core.Models.DataUpdater
{
    public interface IBasicLiveUpdaterStatus
    {
        string Status { get; }
        bool IsUnreliable { get; }
        bool IsProbablyDown{ get; }
    }
}
