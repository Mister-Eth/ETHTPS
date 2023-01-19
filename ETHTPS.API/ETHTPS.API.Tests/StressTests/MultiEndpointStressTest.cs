using NUnit.Framework;

using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ETHTPS.API.Tests.StressTests
{
    [TestFixture]
    public class MultiEndpointStressTest
    {
        private readonly string _endpoint;
        private readonly string[] _stressTestPaths;
        private readonly HttpClient _httpClient;
        private readonly int _maxConcurrentRequests;

        public MultiEndpointStressTest()
        {
            _endpoint = "http://10.10.0.174:50023";
            //_endpoint = "https://api.ethtps.info";
            _stressTestPaths = new string[]
            {
                "/API/v2/InstantData?includeSidechains=true",
                "/API/TPS/Get?provider=All&interval=OneHour&network=Mainnet&includeSidechains=true",
                "/API/GPS/Get?provider=All&interval=OneHour&network=Mainnet&includeSidechains=true",
                "/API/v2/ProviderTypesColorDictionary",
                "/API/v2/ColorDictionary",
                "/API/v2/Networks",
                "/API/v2/Intervals",
                "/API/v2/Providers",
            };
            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri(_endpoint)
            };
            _maxConcurrentRequests = 50;
        }

        [Test]
        public void StressTest()
        {
            var requests = _stressTestPaths.SelectMany(path => Enumerable.Range(0, _maxConcurrentRequests / _stressTestPaths.Length).Select(x => Task.Run(async () =>
            {
                var response = await _httpClient.GetAsync(path);
                Assert.That(response.IsSuccessStatusCode, $"Failed with {response.StatusCode}");
            })));
            Assert.DoesNotThrowAsync(async () =>
            {
                await Task.WhenAll(requests);
                //Assert.That(requests.All(x => x.Status == TaskStatus.RanToCompletion), $"Failed: {requests.Count(x => x.Status != TaskStatus.RanToCompletion)}");
            });
        }
    }
}
