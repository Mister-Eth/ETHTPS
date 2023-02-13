using Newtonsoft.Json;

namespace ETHTPS.WSAPI.Infrastructure
{
    public class WebsocketClientMessage
    {
        public string Type { get; set; }
        public object Data { get; set; }
        public static WebsocketClientMessage FromString(string type, string data) => new() { Data = data, Type = type };
        public string ToJSON() => JsonConvert.SerializeObject(this);
    }
}
