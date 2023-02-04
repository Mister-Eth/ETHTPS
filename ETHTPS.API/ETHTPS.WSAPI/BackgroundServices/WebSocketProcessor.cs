using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Net.WebSockets;

namespace ETHTPS.WSAPI.BackgroundServices
{
    public class WebSocketProcessor : IHostedService, IDisposable
    {
        private int executionCount = 0;
        private Timer? _timer = null;
        private static List<(WebSocket socket, TaskCompletionSource<object> completionSource)> _sockets = new();
        public static void AddSocket(WebSocket
             socket, TaskCompletionSource<object> completionSource)
        {
            _sockets.Add((socket, completionSource));
        }

        public Task StartAsync(CancellationToken stoppingToken)
        {
            _timer = new Timer(DoWork, null, TimeSpan.Zero,
                TimeSpan.FromSeconds(5));

            return Task.CompletedTask;
        }

        private void DoWork(object? state)
        {
            var count = Interlocked.Increment(ref executionCount);
        }

        public Task StopAsync(CancellationToken stoppingToken)
        {

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
