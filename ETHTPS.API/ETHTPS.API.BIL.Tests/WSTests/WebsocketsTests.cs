using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using NLog;

using NUnit.Framework.Internal;

using System;
using System.Diagnostics;

using WebSocketSharp;

namespace ETHTPS.Tests.WSTests
{
    public class WebsocketsTests : TestBase
    {
        private const string _wsURL = "ws://localhost:2000/LiveData";
        private ILogger<WebsocketsTests> _logger;
        private int _expectedTime = 4000;
        private int _failMultiplier = 2;
        List<WebSocket> _wsList = new List<WebSocket>();
        WebSocket _monitoringWS;

        [SetUp]
        public void Setup()
        {
            _logger = ServiceProvider.GetRequiredService<ILogger<WebsocketsTests>>();
            _monitoringWS = CreateWebsocket();
        }

        [TearDown]
        public void Teardown()
        {
            _wsList.ForEach(x => x.Close());
            _monitoringWS.Close();
        }

        private WebSocket CreateWebsocket()
        {
            var ws = new WebSocket(_wsURL);
            ws.Connect();
            return ws;
        }

        [Test]
        public async Task NotNullTest()
        {
            var ws = CreateWebsocket();
            Assert.NotNull(ws);
            await Task.Delay(5000);
            ws.Close();
            Assert.Pass();
        }

        [Test]
        public async Task OverloadTest()
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            _monitoringWS.OnMessage += (sender, e) =>
            {
                if (e.Data == "keep_alive")
                {
                    _monitoringWS.Send("ack");
                    return;
                }
                stopwatch.Stop();
                TestContext.Out.WriteLine
                ($"Time with {_wsList.Count + 1} connections: {stopwatch.Elapsed.TotalMilliseconds}ms");
                Assert.IsTrue(stopwatch.Elapsed.TotalMilliseconds < _failMultiplier * _expectedTime);
                stopwatch.Restart();
            };
            while (true)
            {
                await Task.Delay(1000);
            }
        }
    }
}
