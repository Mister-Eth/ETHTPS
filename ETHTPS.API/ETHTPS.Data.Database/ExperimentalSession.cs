using ETHTPS.Data.Core;

namespace ETHTPS.Data.Integrations.MSSQL;

public partial class ExperimentalSession : IIndexed
{

    public int Experiment { get; set; }

    public string TargetIpaddress { get; set; }

    public int RetentionSeconds { get; set; }

    public virtual Experiment IdNavigation { get; set; }
    public int Id { get; set; }
}
