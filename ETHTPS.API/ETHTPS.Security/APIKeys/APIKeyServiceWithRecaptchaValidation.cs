using ETHTPS.API.Security.Core.Humanity;
using ETHTPS.API.Security.Core.Humanity.Recaptcha;
using ETHTPS.Configuration;
using ETHTPS.Configuration.Extensions;
using ETHTPS.Data.Core.Extensions.StringExtensions;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.ResponseModels.APIKey;

namespace ETHTPS.API.Security.Core.APIKeys
{
    public class APIKeyServiceWithRecaptchaValidation : IHumanityAPIKeyProvider<IRecaptchaVerificationService>
    {
        private readonly EthtpsContext _context;
        private const int DEFAULT_REQUEST_LIMIT_24H = 5 * 5 * 3600 * 24; //Equivalent to 1 request per second; should be more than anyone needs
        private readonly IDBConfigurationProvider _configurationProvider;
        public IRecaptchaVerificationService HumanityService { get; }

        public APIKeyServiceWithRecaptchaValidation(EthtpsContext context, IRecaptchaVerificationService recaptchaVerificationService, IDBConfigurationProvider configurationProvider)
        {
            _context = context;
            HumanityService = recaptchaVerificationService;
            _configurationProvider = configurationProvider;
        }

        private async Task<bool> ValidateAsync(string humanityProof)
        {
            if (!RecaptchaRequired())
                return true;

            return await HumanityService.CheckHumanityAsync(humanityProof);
        }
        /// <summary>
        /// We don't need recaptcha unless we're dealing with spam
        /// </summary>
        private bool RecaptchaRequired() => _configurationProvider.GetFirstConfigurationString("RequireRecaptcha") == "true";

        public async Task<APIKeyResponseModel> RegisterNewKeyAsync(string humanityProof, string ipAddress)
        {
            if (!await ValidateAsync(humanityProof))
            {
                return APIKeyResponseModel.Failed("Beep boop");
            }
            return await RegisterNewKeyAsync(ipAddress);
        }

        public async Task<APIKeyResponseModel> RegisterNewKeyForIPAddressAsync(string ipAddress)
        {
            if (HumanityService.IsHumanityCheckRequired)
                return APIKeyResponseModel.Failed("Humanity check required");
            return await RegisterNewKeyAsync(ipAddress);
        }

        private Task<APIKeyResponseModel> RegisterNewKeyAsync(string ipAddress)
        {
            var actualKey = KeyGenerator.GetUniqueKey(64);
            Apikey key = new()
            {
                KeyHash = actualKey.SHA256(),
                Limit24h = DEFAULT_REQUEST_LIMIT_24H,
                CallsLast24h = 0,
                TotalCalls = 0,
                RequesterIpaddress = ipAddress
            };
            _context.Apikeys.Add(key);
            _context.SaveChanges();
            Console.WriteLine($"New API key created from {key.RequesterIpaddress}");
            return Task.FromResult(APIKeyResponseModel.Successful(actualKey, key.Limit24h));
        }

        public Task<APIKeyResponseModel> RegisterNewKeyForProofAsync(string humanityProof) => Task.FromResult(APIKeyResponseModel.Failed("IP Address required"));
    }
}
