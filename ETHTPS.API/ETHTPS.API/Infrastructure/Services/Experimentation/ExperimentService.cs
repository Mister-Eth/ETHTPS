using ETHTPS.Data.Database;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Linq;

namespace ETHTPS.API.Infrastructure.Services.Experimentation
{
    public class ExperimentService : IExperimentService
    {
        private readonly ETHTPSContext _context;

        public ExperimentService(ETHTPSContext context)
        {
            _context = context;
        }

        public IEnumerable<int> GetAvailableExperiments(ExperimentRequesterParameters parameters)
        {
            if (!string.IsNullOrWhiteSpace(parameters.DeviceType))
            {
                lock (_context.LockObj)
                {/*
                    if (!_context.ApikeyExperimentBindings.Any(x=>x.Apikey.KeyHash == ))
                    var availableDeviceBasedExperiments = _context.ExperimentTargetTypes.Where(x=>x.TargetTypeName == "Device" && x.TargetTypeValue == parameters.DeviceType).ToList();
                    */
                }
            }
            yield return -1;
        }

        public void GiveAnonymousFeedback()
        {
            throw new System.NotImplementedException();
        }
    }
}
