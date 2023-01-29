using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

using System.IO;
using System.Net;
using System.Text;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Net.Http;
using ETHTPS.Data.ResponseModels.Recaptcha;

namespace ETHTPS.API.Infrastructure.Services.Recaptcha
{
    public class RecaptchaVerificationService : IRecaptchaVerificationService
    {
        private readonly string _privateKey;
        private readonly HttpClient _httpClient = new();

        public RecaptchaVerificationService(IConfiguration configuration)
        {
            _privateKey = configuration.GetSection("RecaptchaSecretKey").Value;
        }

        public async Task<bool> VerifyRecaptchaAsync(string recaptchaToken)
        {
            var dictionary = new Dictionary<string, string>()
                    {
                        { "secret", _privateKey },
                        { "response", recaptchaToken }

                    };
            var postContent = new FormUrlEncodedContent(dictionary);
            var response = await _httpClient.PostAsync("https://www.google.com/recaptcha/api/siteverify", postContent);
            var stringContent = await response.Content.ReadAsStringAsync();
            if (!response.IsSuccessStatusCode||string.IsNullOrEmpty(stringContent))
            {
                return false;
            }
            var googleReCaptchaResponse = JsonConvert.DeserializeObject<RecaptchaResponse>(stringContent);
            return googleReCaptchaResponse.Success;
        }

    }
}
