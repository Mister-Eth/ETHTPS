using ETHTPS.API.BIL.Infrastructure.Services;
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
        private readonly IWebsiteStatisticsService? _statisticsService;

        public WSClientHandler(ILogger<WSClientHandler>? logger, GeneralService? generalService, IWebsiteStatisticsService? statisticsService)
        {
            _logger = logger;
            _generalService = generalService;
            _statisticsService = statisticsService;
        }

        protected override void OnOpen()
        {
            base.OnOpen();
            _statisticsService?.IncrementNumberOfCurrentVisitors();
            _logger?.LogInformation($"New ws connection: " + this.ID);
            _logger?.LogInformation($"Total: " + this.Sessions.ActiveIDs.Count());
        }
        protected override void OnMessage(MessageEventArgs e)
        {
            base.OnMessage(e);
            _logger?.LogTrace($"Message from ws connection {ID}: {e.Data.ToString()}");
        }
        protected override void OnClose(CloseEventArgs e)
        {
            base.OnClose(e);
            _statisticsService?.DecrementNumberOfCurrentVisitors();
            _logger?.LogInformation($"Closed ws connection: " + this.ID);
            _logger?.LogInformation($"Remaining: " + this.Sessions.ActiveIDs.Count());
        }

        protected override void OnError(WebSocketSharp.ErrorEventArgs e)
        {
            base.OnError(e);
            if (this.State != WebSocketState.Open)
            {
                _statisticsService.DecrementNumberOfCurrentVisitors();
            }
        }

        private void Send(WebsocketClientMessage message)
        {
            Send(message.ToJSON());
        }
    }
}
