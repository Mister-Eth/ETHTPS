using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Services.BlockchainServices.HangfireLogging;
using Hangfire;

using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BackgroundTasks.Recurring.APIKeys
{
    public class _24hCallsCleanupTask : HangfireBackgroundService
    {
        public _24hCallsCleanupTask(ILogger<HangfireBackgroundService> logger, EthtpsContext context) : base(logger, context)
        {
        }

        protected override string? ServiceName => "24h Calls cleanup task";

        [AutomaticRetry(Attempts = 5, OnAttemptsExceeded = AttemptsExceededAction.Fail)]
        public override Task RunAsync()
        {
            return Task.CompletedTask;
        }
    }
}
