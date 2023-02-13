using Coravel.Invocable;

using WebSocketSharp.Server;

namespace ETHTPS.WSAPI.Infrastructure
{
    public abstract class WebsocketInvocable : IInvocable
    {
        protected readonly WebSocketServer _webSocketServer;

        protected WebsocketInvocable(WebSocketServer webSocketServer)
        {
            _webSocketServer = webSocketServer;
        }

        public abstract Task Invoke();
    }
}
