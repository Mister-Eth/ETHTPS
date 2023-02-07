namespace ETHTPS.API.Security.Core.Humanity
{
    public interface IHumanityCheckService
    {
        Task<bool> CheckHumanityAsync(string humanityProof);
        bool IsHumanityCheckRequired { get; }
    }
}
