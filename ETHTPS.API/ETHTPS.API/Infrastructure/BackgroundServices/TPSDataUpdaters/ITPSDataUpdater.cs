using ETHTPS.API.Infrastructure.Database.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.BackgroundServices.TPSDataUpdaters
{
    public interface ITPSDataUpdater
    {
        Task LogDataAsync(ETHTPSContext context);
    }
}
