using ETHTPS.Data.Database;
using ETHTPS.Services.Attributes;
using ETHTPS.Services.BlockchainServices;

using Hangfire;

using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.Queuing
{
    public class HangfireRabbitMQRecurringTaskPublisher<T> : HangfireBlockInfoProviderDataLogger<T>
        where T : IBlockInfoProvider
    {
        private readonly RabbtiMQPublisher _publisher;

        public HangfireRabbitMQRecurringTaskPublisher(T instance,
                                                      ILogger<HangfireBackgroundService> logger,
                                                      ETHTPSContext context,
                                                      RabbtiMQPublisher publisher) : base(instance, logger, context)
        {
            _publisher = publisher;
        }

        [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        [UseQueueFromParameter(0)]
        public Task RunAsync(string queueName)
        {
            _publisher.Publish<HangfireBlockInfoProviderDataLogger<T>, T>(queueName);
            return Task.CompletedTask;
        }
    }
}
