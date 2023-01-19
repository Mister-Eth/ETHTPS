using ETHTPS.Services.Ethereum.Starkware.API.Models;
using ETHTPS.Services.Ethereum.Starkware.API.Models.TransactionCount;
using ETHTPS.Services.Extensions;

using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.Ethereum.Starkware.API
{
    public class StarkwareClient
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly string _endpoint;

        private StarkwareClient()
        {
            _httpClient = new HttpClient();
        }

        public StarkwareClient(string endpoint, string apiKey) : this()
        {
            _endpoint = endpoint;
            _apiKey = apiKey;
        }

        public StarkwareClient(IConfiguration configuration) : this()
        {
            var section = configuration.GetSection("Starkware");
            _endpoint = section.GetValue<string>("Endpoint");
            _apiKey = section.GetValue<string>("APIKey");
        }

        public async Task<int> GetTransactionCountForAllTokensAsync(DateTime date, string product)
        {
            TransactionCountRequestModel model = new()
            {
                Product = product,
                TransactionType = TransactionTypes.All,
                UnixDayStart = date.GetUnixDay() - 1,
                UnixDayEnd = date.GetUnixDay(),
                TokenID = TransactionTypes.All
            };
            return (await GetTransactionCountAsync(model)).Count;
        }

        public async Task<int> GetTodayTransactionCountForAllTokensAsync(string product) => await GetTransactionCountForAllTokensAsync(DateTime.Now, product);

        public async Task<TransactionCountResponseModel> GetTransactionCountAsync(TransactionCountRequestModel model)
        {
            var json = JsonConvert.SerializeObject(model);
            var message = new HttpRequestMessage()
            {
                Content = new StringContent(json, Encoding.UTF8, "application/json"),
                Method = HttpMethod.Post,
                RequestUri = new Uri(string.Format($"{_endpoint}/aggregations/count?key={_apiKey}"), UriKind.Absolute)
            };
            var response = await _httpClient.SendAsync(message);
            if (response.IsSuccessStatusCode)
            {
                var responseString = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<TransactionCountResponseModel>(responseString);
            }
            else
            {
                throw new HttpRequestException(response.ReasonPhrase);
            }
        }
    }
}
