using Hangfire.Common;
using Hangfire.States;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.Attributes
{
    internal class UseQueueFromParameterAttribute : JobFilterAttribute, IElectStateFilter
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="QueueAttribute"/> class
        /// using the specified queue name.
        /// </summary>
        /// <param name="queue">Queue name.</param>
        public UseQueueFromParameterAttribute(int parameterIndex)
        {
            this.ParameterIndex = parameterIndex;
        }

        public int ParameterIndex { get; private set; }

        public void OnStateElection(ElectStateContext context)
        {
            var enqueuedState = context.CandidateState as EnqueuedState;
            if (enqueuedState != null)
            {
#pragma warning disable CS0618 // Type or member is obsolete
                enqueuedState.Queue = context.Job.Arguments[ParameterIndex].Replace("\"", string.Empty);
#pragma warning restore CS0618 // Type or member is obsolete
            }
        }
    }
}
