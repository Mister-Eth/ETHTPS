using Microsoft.Extensions.Configuration;

using RabbitMQ.Client;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.Queuing
{
    public abstract class RabbitMQConnectionBase : IDisposable
    {
        protected ConnectionFactory ConnectionFactory { get; private set; }
        protected string Host { get; private set; }
        protected IEnumerable<string> Queues { get; private set; }
        protected IConnection Connection { get; private set; }
        protected IModel Channel { get; private set; }

        protected RabbitMQConnectionBase(string host, params string[] queues)
        {
            Host = host;
            Queues = queues;
            ConnectionFactory = new ConnectionFactory() { HostName = Host };
            Connection = ConnectionFactory.CreateConnection();
            Channel = Connection.CreateModel();
        }

        protected RabbitMQConnectionBase(IConfiguration configuration, params string[] queues) 
            : this(configuration.GetSection("RabbitMQ").GetValue<string>("Host"), queues)
        {

        }

        public abstract void Initialize();

        public void Dispose()
        {
            Connection?.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
