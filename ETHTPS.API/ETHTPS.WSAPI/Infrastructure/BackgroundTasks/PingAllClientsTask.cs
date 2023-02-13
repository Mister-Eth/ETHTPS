using Coravel.Invocable;

using Newtonsoft.Json;

using System.Text;

using WebSocketSharp.Server;

namespace ETHTPS.WSAPI.Infrastructure.BackgroundTasks
{
    public class PingAllClientsTask : WebsocketInvocable
    {
        private readonly ILogger<PingAllClientsTask> _logger;
        public PingAllClientsTask(WebSocketServer webSocketServer, ILogger<PingAllClientsTask> logger) : base(webSocketServer)
        {
            _logger = logger;
        }

        public override Task Invoke()
        {
            _webSocketServer.WebSocketServices.BroadcastAsync(new WebsocketClientMessage()
            {
                Type = "keep_alive"
            }.ToJSON(), () =>
            {

            });
            return Task.CompletedTask;
        }
    }
}
