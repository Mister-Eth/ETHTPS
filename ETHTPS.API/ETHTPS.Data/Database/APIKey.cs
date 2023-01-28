using System;
using System.Collections.Generic;
using ETHTPS.Data.Database;

namespace ETHTPS.Data.Database;

public partial class Apikey
{
    public int Id { get; set; }

    public string KeyHash { get; set; }

    public int TotalCalls { get; set; }

    public int CallsLast24h { get; set; }

    public int Limit24h { get; set; }

    public string RequesterIpaddress { get; set; }

    public int? ExperimentId { get; set; }

    public virtual Experiment Experiment { get; set; }
}
