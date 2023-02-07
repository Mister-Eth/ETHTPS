using Newtonsoft.Json;
using ETHTPS.Data.ResponseModels.Recaptcha;
using ETHTPS.Configuration;
using ETHTPS.Configuration.Extensions;

namespace ETHTPS.API.Security.Core.Humanity.Recaptcha
{
    public class RecaptchaVerificationService : IRecaptchaVerificationService
    {
        private readonly string _privateKey;
        private readonly HttpClient _httpClient = new();
        private readonly IDBConfigurationProvider _dBConfigurationProvider;

        public RecaptchaVerificationService(IDBConfigurationProvider configurationProvider)
        {
            _privateKey = configurationProvider.GetFirstConfigurationString("RecaptchaSecretKey");
            _dBConfigurationProvider = configurationProvider;
        }

        public bool IsHumanityCheckRequired { get => _dBConfigurationProvider.GetFirstConfigurationString("RequireRecaptcha") == "true"; }

        public async Task<bool> CheckHumanityAsync(string recaptchaToken)
        {
            if (!IsHumanityCheckRequired)
                return true;

            var dictionary = new Dictionary<string, string>()
                    {
                        { "secret", _privateKey },
                        { "response", recaptchaToken }

                    };
            var postContent = new FormUrlEncodedContent(dictionary);
            var response = await _httpClient.PostAsync("https://www.google.com/recaptcha/api/siteverify", postContent);
            var stringContent = await response.Content.ReadAsStringAsync();
            if (!response.IsSuccessStatusCode || string.IsNullOrEmpty(stringContent))
            {
                return false;
            }
            var googleReCaptchaResponse = JsonConvert.DeserializeObject<RecaptchaResponse>(stringContent);
            return googleReCaptchaResponse.Success;
        }

    }
}
