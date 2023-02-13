﻿using Coravel.Invocable;

using ETHTPS.API.Core.Integrations.MSSQL.Services;

using Newtonsoft.Json;

using System.Text;

using WebSocketSharp.Server;

namespace ETHTPS.WSAPI.Infrastructure
{
    public class SendLiveDataTask : WebsocketInvocable
    {
        private readonly ILogger<PingAllClientsTask> _logger;
        private readonly GeneralService _generalService;
        public SendLiveDataTask(WebSocketServer webSocketServer, ILogger<PingAllClientsTask> logger, GeneralService generalService) : base(webSocketServer)
        {
            _logger = logger;
            _generalService = generalService;
        }

        public override Task Invoke()
        {
            _webSocketServer.WebSocketServices.BroadcastAsync((new WebsocketClientMessage()
            {
                Type = "post_live_data",
                Data = _generalService.InstantData(new Data.Models.Query.ProviderQueryModel())
            }).ToJSON(), () =>
            {

            });
            return Task.CompletedTask;
        }
    }
}
