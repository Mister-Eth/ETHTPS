using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.Extensions;

using Microsoft.Extensions.Configuration;

using RabbitMQ.Client;
using RabbitMQ;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.Queuing
{
    public class RabbtiMQPublisher : RabbitMQConnectionBase
    {
        public RabbtiMQPublisher(string hostName, params string[] queues) : base(hostName, queues)
        {

        }

        public RabbtiMQPublisher(IConfiguration configuration, params string[] queues) : base(configuration, queues)
        {

        }

        public override void Initialize()
        {
            foreach (var queue in Queues)
            {
                Channel.QueueDeclare(queue, durable: true, autoDelete: false, exclusive: false);
            }
        }

        public void Publish<T, V>(string queueName)
            where V: IBlockInfoProvider
            where T: HangfireBlockInfoProviderDataLogger<V>
        {
            var providerName = typeof(V).GetProviderName();
            var typeName = typeof(T).Name;
            var model = new RecurringTaskModel(typeName, providerName);
            Channel.BasicPublish(exchange: "",
                              routingKey: "hello",
                              basicProperties: null,
                              mandatory: true,
                              body: Encoding.UTF8.GetBytes(model.ToString()));
        }
    }
}
