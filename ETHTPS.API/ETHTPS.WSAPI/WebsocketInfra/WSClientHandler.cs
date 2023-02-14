using ETHTPS.API.BIL.Infrastructure.Services;
using ETHTPS.API.Core.Integrations.MSSQL.Services;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Integrations.MSSQL.Extensions;
using ETHTPS.WSAPI.Infrastructure;

using System.Linq;
using System.Xml;

using WebSocketSharp;
using WebSocketSharp.Server;

namespace ETHTPS.WSAPI.WebsocketInfra
{
    public class WSClientHandler : WebSocketBehavior
    {
        private readonly ILogger<WSClientHandler>? _logger;
        private readonly GeneralService? _generalService;
        private readonly EthtpsContext? _context;
        private readonly IWebsiteStatisticsService? _statisticsService;
        private readonly DateTime _connectionTime;
        private int _sessionID = 0;
        private const int RETENTION_EXPERIMENT_ID = 6;

        public WSClientHandler(ILogger<WSClientHandler>? logger, GeneralService? generalService, IWebsiteStatisticsService? statisticsService, EthtpsContext? context)
        {
            _logger = logger;
            _generalService = generalService;
            _statisticsService = statisticsService;
            _connectionTime = DateTime.Now;
            _context = context;
        }

        protected override void OnOpen()
        {
            base.OnOpen();
            _logger?.LogInformation($"New ws connection: " + this.ID);
            if (!HandleAuthenticationFlow())
            {
                Sessions.CloseSession(ID, CloseStatusCode.PolicyViolation, "A valid API Key is required");
                return;
            }
            _statisticsService?.IncrementNumberOfCurrentVisitors();
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
            _logger?.LogInformation($"Closed ws connection {ID} after {DateTime.Now - _connectionTime}");
            _logger?.LogInformation($"Remaining: " + this.Sessions.ActiveIDs.Count());
            if (_context != null)
            {
                lock (_context.LockObj)
                {
                    var entry = _context.ExperimentalSessions.First(x => x.Id == _sessionID);
                    entry.RetentionSeconds = (int)(DateTime.Now - _connectionTime).TotalSeconds;
                    _context.Update(entry);
                    _context.SaveChanges();
                }
            }
        }

        protected override void OnError(WebSocketSharp.ErrorEventArgs e)
        {
            base.OnError(e);
            if (this.State != WebSocketState.Open)
            {
                _statisticsService?.DecrementNumberOfCurrentVisitors();
            }
        }

        private void Send(WebsocketClientMessage message)
        {
            Send(message.ToJSON());
        }

        private bool HandleAuthenticationFlow()
        {
            if (!Context.QueryString.Contains("XAPIKEY"))
            {
                _logger?.LogInformation($"{ID} didn't provide an API key");
                return false;
            }
            else
            {
                if (_context != null)
                {
                    var key = Context.QueryString["XAPIKEY"] ?? "";
                    if (!_context.ValidateAPIKey(key))
                    {
                        _logger?.LogInformation($"{ID} provided an invalid API key");
                        return false;
                    }
                    else
                    {
                        try
                        {
                            lock (_context.LockObj)
                            {
                                var keyID = _context.GetAPIKeyID(key);
                                var ip = Context.UserEndPoint.Address.ToString();
                                if (_context.ApikeyExperimentBindings.Any(x => x.ApikeyId == keyID && x.ExperimentId == RETENTION_EXPERIMENT_ID))
                                {
                                    var session = new ExperimentalSession()
                                    {
                                        TargetIpaddress = ip,
                                        Experiment = RETENTION_EXPERIMENT_ID,
                                        RetentionSeconds = 0
                                    };
                                    _context.ExperimentalSessions.Add(session);
                                    _context.SaveChanges();
                                    _sessionID = session.Id;
                                }
                            }
                        }
                        catch (Exception e)
                        {
                            _logger?.LogError("Error saving session details to database", e);
                        }
                    }
                }
            }
            return true;
        }
    }
}
