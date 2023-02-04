using ETHTPS.Data.Database;
using ETHTPS.Data.Database.Extensions;
using ETHTPS.Data.Extensions;
using ETHTPS.Services;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.Ethereum;
using ETHTPS.Services.Ethereum.Scan.Implementations;
using ETHTPS.Services.Ethereum.Starkware;
using ETHTPS.Services.Infrastructure.Extensions;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using static ETHTPS.API.Core.Constants;

namespace ETHTPS.API.Core.Infrastructure.Services.Experimentation
{
    public class ExperimentService : IExperimentService
    {
        private readonly EthtpsContext _context;

        public ExperimentService(EthtpsContext context)
        {
            _context = context;
        }

        public Task EnrollInNewExperimentsIfApplicableAsync(ExperimentRequesterParameters parameters, HttpContext context)
        {
            var experiments = _context.GetExperimentsForDeviceType(parameters.DeviceType);
            var runningExperiments = experiments.Where(x => x.IsRunning());
            if (runningExperiments.Any())
            {
                foreach(var experiment in runningExperiments)
                {
                    var apiKeyID = _context.GetAPIKeyID(context);
                    if (_context.UserIsEligibleForEnrollmentIn(experiment, apiKeyID))
                    {
                        _context.EnrollUserIn(experiment, apiKeyID);
                    }
                }
            }
            return Task.CompletedTask;
        }


        public async Task<IEnumerable<int>> GetAvailableExperimentsAsync(ExperimentRequesterParameters parameters, HttpContext context)
        {
            await EnrollInNewExperimentsIfApplicableAsync(parameters, context);
            if (!string.IsNullOrWhiteSpace(parameters.DeviceType))
            {
                lock (_context.LockObj)
                {
                    return _context.GetExperimentsUserIsEnrolledIn(_context.GetAPIKeyID(context)).SafeSelect(x => x.Id);
                }
            }
            return Enumerable.Empty<int>();
        }

        public void GiveAnonymousFeedback()
        {
            throw new System.NotImplementedException();
        }
    }
}
