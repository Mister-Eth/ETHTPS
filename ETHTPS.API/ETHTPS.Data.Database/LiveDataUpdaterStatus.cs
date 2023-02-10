namespace ETHTPS.Data.Integrations.MSSQL;

public partial class LiveDataUpdaterStatus
{
    public int Id { get; set; }

    public int UpdaterId { get; set; }

    public int StatusId { get; set; }

    public DateTime? LastSuccessfulRunTime { get; set; }
    public DateTime? LastRunTime { get; set; }

    public int NumberOfSuccesses { get; set; }

    public int NumberOfFailures { get; set; }

    public virtual DataUpdaterStatus Status { get; set; } = null!;

    public virtual DataUpdater Updater { get; set; } = null!;
}
