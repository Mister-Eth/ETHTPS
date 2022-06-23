using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Attributes
{
    /// <summary>
    /// Specifies how often a task should run using a cron expression.
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = false)]
    public class RunEveryAttribute : Attribute
    {
        public string CronExpression { get; private set; }

        public RunEveryAttribute(string cronExpression)
        {
            CronExpression = cronExpression;
        }
    }
}
