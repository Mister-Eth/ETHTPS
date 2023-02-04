namespace ETHTPS.WSAPI.Services
{
    internal class ScopedProcessingService : IScopedProcessingService
    {
        public async Task DoWorkAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                //Do work
                await Task.Delay(2000, stoppingToken);
            }
        }
    }
}
