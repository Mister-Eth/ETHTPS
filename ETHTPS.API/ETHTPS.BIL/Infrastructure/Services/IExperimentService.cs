
using ETHTPS.Data.Core.Models;

using Microsoft.AspNetCore.Http;

namespace ETHTPS.API.BIL.Infrastructure.Services
{
    public interface IExperimentService
    {
        public Task<IEnumerable<int>> GetAvailableExperimentsAsync(ExperimentRequesterParameters parameters, HttpContext context);
        public Task EnrollInNewExperimentsIfApplicableAsync(ExperimentRequesterParameters parameters, HttpContext context);
        public void GiveAnonymousFeedback();
    }
}
