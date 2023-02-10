namespace ETHTPS.Data.Integrations.MSSQL;

public partial class DataUpdaterStatus
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<LiveDataUpdaterStatus> LiveDataUpdaterStatuses { get; } = new List<LiveDataUpdaterStatus>();
}
