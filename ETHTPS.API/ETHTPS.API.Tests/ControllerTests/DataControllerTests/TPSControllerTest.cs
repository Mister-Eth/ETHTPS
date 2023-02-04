﻿using ETHTPS.API.Core.Controllers;
using ETHTPS.Data.Database;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using NUnit.Framework;

using System.Collections.Generic;
using System.Linq;

namespace ETHTPS.API.Tests.ControllerTests.DataControllerTests
{
    [TestFixture]
    public class TPSControllerTest
    {
        private readonly TPSController _controller;
        private readonly EthtpsContext _context;
        private IEnumerable<string> _providers;
        private IEnumerable<string> _networks;

        public TPSControllerTest()
        {
            var serviceProvider = DependencyContainer.GetServiceProvider();

            _context = serviceProvider.GetRequiredService<EthtpsContext>();
            _providers = _context.Providers.Select(x => x.Name).AsEnumerable();
            _networks = _context.Networks.Select(x => x.Name).AsEnumerable();
            _controller = serviceProvider.GetRequiredService<TPSController>();
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
