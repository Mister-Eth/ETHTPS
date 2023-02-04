namespace ETHTPS.WSAPI.Services
{
    internal interface IScopedProcessingService
    {
        Task DoWorkAsync(CancellationToken stoppingToken);
    }
}
