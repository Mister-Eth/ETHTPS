using ETHTPS.API.Infrastructure.Services;
using ETHTPS.Data.Database;
using ETHTPS.Data.ResponseModels;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using NUnit.Framework;

using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

namespace ETHTPS.API.Tests.ControllerTests.DataControllerTests
{
    [TestFixture]
    public class TPSControllerTest
    {
        private readonly Controllers.TPSController _controller;
        private readonly ETHTPSContext _context;
        private IEnumerable<string> _providers;
        private IEnumerable<string> _networks;

        public TPSControllerTest()
        {
            var serviceProvider = DependencyContainer.GetServiceProvider();

            _context = serviceProvider.GetRequiredService<ETHTPSContext>();
            _providers = _context.Providers.Select(x => x.Name).AsEnumerable();
            _networks = _context.Networks.Select(x => x.Name).AsEnumerable();
            _controller = serviceProvider.GetRequiredService<Controllers.TPSController>();
        }

        [Test]
        public void MaxTest()
        {
            foreach (var provider in _providers)
            {
                foreach (var network in _networks)
                {
                    Assert.DoesNotThrow(() =>
                    {
                        _controller.Max(new Data.Models.Query.ProviderQueryModel()
                        {
                            Network = network,
                            Provider = provider
                        });
                    });
                }
            }
        }
    }
}
