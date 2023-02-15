using ETHTPS.Data.Core.Models.ResponseModels.APIKey;

namespace ETHTPS.Data.ResponseModels.APIKey
{
    public class APIKeyResponseModel : SimpleAPIKey
    {
        public static APIKeyResponseModel Successful(string key, int requestLimit24h) => new APIKeyResponseModel(true, null, key, requestLimit24h);
        public static APIKeyResponseModel Failed(string reason) => new APIKeyResponseModel()
        {
            Success = false,
            FailureReason = reason
        };
        public APIKeyResponseModel() { }
        private APIKeyResponseModel(bool success, string failureReason, string key, int requestLimit24h)
        {
            Success = success;
            FailureReason = failureReason;
            Key = key;
            RequestLimit24h = requestLimit24h;
        }

        public bool Success { get; private set; }
        public string? FailureReason { get; private set; }
    }
}
