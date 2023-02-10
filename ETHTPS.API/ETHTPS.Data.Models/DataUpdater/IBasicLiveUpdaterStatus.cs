namespace ETHTPS.Data.Models.DataUpdater
{
    public interface IBasicLiveUpdaterStatus
    {
        string Status { get; }
        bool IsUnreliable { get; }
        bool IsProbablyDown{ get; }
    }
}
