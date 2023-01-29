using System.Collections;
using System.Collections.Generic;

namespace ETHTPS.API.Infrastructure.Services.Experimentation
{
    public interface IExperimentService
    {
        public IEnumerable<int> GetAvailableExperiments(ExperimentRequesterParameters parameters);
        public void GiveAnonymousFeedback();
    }
}
