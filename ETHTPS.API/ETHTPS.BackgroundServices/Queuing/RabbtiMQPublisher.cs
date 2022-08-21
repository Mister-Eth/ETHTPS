using Microsoft.Extensions.Configuration;

using RabbitMQ.Client;

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
            using (var channel = Connection.CreateModel())
            {
                foreach(var queue in Queues)
                {
                    channel.QueueDeclare(queue, durable: true, autoDelete: false, exclusive: false);
                }
            }
        }
    }
}
