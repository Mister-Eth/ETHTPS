using Microsoft.Extensions.Configuration;

using RabbitMQ.Client.Events;
using RabbitMQ.Client;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.Queuing
{
    public class RabbitMQReceiver : RabbitMQConnectionBase
    {
        private IModel _channel;
        public RabbitMQReceiver(string hostName, params string[] queues) : base(hostName, queues)
        {

        }

        public RabbitMQReceiver(IConfiguration configuration, params string[] queues) : base(configuration, queues)
        {

        }

        public override void Initialize()
        {
            _channel = Connection.CreateModel();
            foreach (var queue in Queues)
            {
                //channel.QueueDeclare(queue, durable: true, autoDelete: false, exclusive: false);
                var consumer = new EventingBasicConsumer(_channel);
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    Console.WriteLine(" [x] Received {0}", message);
                };
                _channel.BasicConsume(queue: queue,
                    noLocal: false,
                    exclusive: false,
                    arguments: new Dictionary<string, object>(),
                    autoAck: true,
                    consumer: consumer);
            }
        }
    }
}
