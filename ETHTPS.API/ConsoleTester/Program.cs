using ETHTPS.Tests.WSTests;

using System.Diagnostics;

using WebSocketSharp;



const string _wsURL = "ws://localhost:2000/LiveData";
WebSocket CreateWebsocket()
{
    var ws = new WebSocket(_wsURL);
    ws.Connect();
    return ws;
}

int _expectedTime = 4000;
int _failMultiplier = 2;
List<WebSocket> _wsList = new List<WebSocket>() { CreateWebsocket() };
WebSocket _monitoringWS = CreateWebsocket();


var stopwatch = new Stopwatch();
stopwatch.Start();
bool adding = false;
_monitoringWS.OnMessage += (sender, e) =>
{
    if (e.Data == "keep_alive")
    {
        _monitoringWS.Send("ack");
        return;
    }
    if (adding)
        return;
    stopwatch.Stop();
    Console.WriteLine
    ($"Time with {_wsList.Count + 1} connections: {stopwatch.Elapsed.TotalMilliseconds}ms");
    if (stopwatch.Elapsed.TotalMilliseconds > _failMultiplier * _expectedTime)
    {
        throw new Exception($"Failed at {_wsList.Count + 1} subscribers");
    }
    var count = _wsList.Count;
    adding = true;
    global::System.Console.WriteLine($"Adding {count} more connections...");
    _wsList.AddRange(Enumerable.Range(0, count
        ).Select(x => CreateWebsocket()));
    stopwatch.Restart();
    adding = false;
};
while (true)
{
    await Task.Delay(1000);
}