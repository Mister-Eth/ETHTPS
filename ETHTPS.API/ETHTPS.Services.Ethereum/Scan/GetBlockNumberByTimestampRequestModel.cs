namespace ETHTPS.Services.Ethereum.Scan
{
    public class GetBlockNumberByTimestampRequestModel : ScanRequestModel
    {

        public string Closest { get; private set; } = "before";
        public long Timestamp { get; private set; }

        public GetBlockNumberByTimestampRequestModel(string apiKey, long timestamp) : base("block", "getblocknobytime", apiKey)
        {
            Timestamp = timestamp;
        }
    }
}
