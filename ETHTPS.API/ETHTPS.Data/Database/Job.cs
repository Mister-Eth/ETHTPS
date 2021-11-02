using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class Job
    {
        public Job()
        {
            JobParameters = new HashSet<JobParameter>();
            States = new HashSet<State>();
        }

        public long Id { get; set; }
        public long? StateId { get; set; }
        public string StateName { get; set; }
        public string InvocationData { get; set; }
        public string Arguments { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ExpireAt { get; set; }

        public virtual ICollection<JobParameter> JobParameters { get; set; }
        public virtual ICollection<State> States { get; set; }
    }
}
