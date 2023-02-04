using Microsoft.AspNetCore.Http;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace ETHTPS.API.Core.Infrastructure.Services.Experimentation
{
    public interface IExperimentService
    {
        public Task<IEnumerable<int>> GetAvailableExperimentsAsync(ExperimentRequesterParameters parameters, HttpContext context);
        public Task EnrollInNewExperimentsIfApplicableAsync(ExperimentRequesterParameters parameters, HttpContext context);
        public void GiveAnonymousFeedback();
    }
}
