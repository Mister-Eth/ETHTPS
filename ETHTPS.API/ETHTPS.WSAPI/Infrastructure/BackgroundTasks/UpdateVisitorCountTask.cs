using ETHTPS.API.BIL.Infrastructure.Services;

using WebSocketSharp.Server;

namespace ETHTPS.WSAPI.Infrastructure.BackgroundTasks
{
    public class UpdateVisitorCountTask : WebsocketInvocable
    {
        private readonly IWebsiteStatisticsService _statisticsService;

        public UpdateVisitorCountTask(WebSocketServer webSocketServer, IWebsiteStatisticsService statisticsService) : base(webSocketServer)
        {
            _statisticsService = statisticsService;
        }

        public override Task Invoke()
        {
            _webSocketServer.WebSocketServices.BroadcastAsync(new WebsocketClientMessage()
            {
                Type = "new_visitor_count",
                Data = _statisticsService.GetNumberOfCurrentVisitors()
            }.ToJSON(), () =>
            {

            });
            return Task.CompletedTask;
        }
    }
}
