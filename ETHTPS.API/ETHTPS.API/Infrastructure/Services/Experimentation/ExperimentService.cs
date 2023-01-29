using ETHTPS.Data.Database;
using ETHTPS.Data.Database.Extensions;
using ETHTPS.Data.Extensions;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.Services.Experimentation
{
    public class ExperimentService : IExperimentService
    {
        private readonly ETHTPSContext _context;

        public ExperimentService(ETHTPSContext context)
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
