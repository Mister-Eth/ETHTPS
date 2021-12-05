using ETHTPS.API.Infrastructure.Services;
using ETHTPS.Data.Database;
using ETHTPS.Data.ResponseModels;

using NUnit.Framework;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.API.Tests.ControllerTests.DataControllerTests
{
    [TestFixture]
    public abstract class PSControllerTestBase<TDataPoint, TResponseModel>
    {
        private readonly IPSController<DataPoint, DataResponseModel> _controller;
        private readonly ETHTPSContext _context;
        private IEnumerable<string> _providers;
        private IEnumerable<string> _networks;
        private IEnumerable<string> _intervals;

        protected PSControllerTestBase(IPSController<DataPoint, DataResponseModel> controller, ETHTPSContext context)
        {
            _controller = controller;
            _context = context;

            _providers = _context.Providers.Select(x => x.Name).AsEnumerable();
            _networks = _context.Networks.Select(x => x.Name).AsEnumerable();
        }

        [Test]
        public void MaxTest()
        {
            foreach(var provider in _providers)
            {
                foreach(var network in _networks)
                {
                    Assert.DoesNotThrow(() =>
                    {
                        _controller.Max(provider, network);
                    });
                }
            }
        }
    }
}
