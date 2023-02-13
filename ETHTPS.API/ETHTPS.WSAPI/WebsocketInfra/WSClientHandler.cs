using ETHTPS.API.Core.Integrations.MSSQL.Services;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.WSAPI.Infrastructure;

using WebSocketSharp;
using WebSocketSharp.Server;

namespace ETHTPS.WSAPI.WebsocketInfra
{
    public class WSClientHandler : WebSocketBehavior
    {
        private readonly ILogger<WSClientHandler>? _logger;
        private readonly GeneralService? _generalService;

        public WSClientHandler(ILogger<WSClientHandler>? logger, GeneralService? generalService)
        {
            _logger = logger;
            _generalService = generalService;
        }

        protected override void OnOpen()
        {
            base.OnOpen();
            _logger?.LogInformation($"New ws connection: " + this.ID);
            _logger?.LogInformation($"Total: " + this.Sessions.ActiveIDs.Count());
        }
        protected override void OnMessage(MessageEventArgs e)
        {
            base.OnMessage(e);
            _logger?.LogInformation($"Message from ws connection {ID}: {e.Data.ToString()}");
            //Send(WebsocketClientMessage.FromString("Echo", e.Data));
        }

        protected override void OnClose(CloseEventArgs e)
        {
            base.OnClose(e);
            _logger?.LogInformation($"Closed ws connection: " + this.ID);
            _logger?.LogInformation($"Remaining: " + this.Sessions.ActiveIDs.Count());
        }

        private void Send(WebsocketClientMessage message)
        {
            Send(message.ToJSON());
        }
    }
}
