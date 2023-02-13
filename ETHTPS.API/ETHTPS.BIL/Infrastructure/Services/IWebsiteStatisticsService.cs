namespace ETHTPS.API.BIL.Infrastructure.Services
{
    public interface IWebsiteStatisticsService
    {
        int GetNumberOfCurrentVisitors();
        void SetNumberOfCurrentVisitors(int count);
        void IncrementNumberOfCurrentVisitors();
        void DecrementNumberOfCurrentVisitors();
        bool Enabled { get; }
    }
}
