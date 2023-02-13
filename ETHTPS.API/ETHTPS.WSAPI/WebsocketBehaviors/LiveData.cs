using WebSocketSharp;
using WebSocketSharp.Server;

namespace ETHTPS.WSAPI.WebsocketBehaviors
{
    public class LiveData : WebSocketBehavior
    {
        protected override void OnMessage(MessageEventArgs e)
        {
            Send(e.Data);
        }
    }
}
