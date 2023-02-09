using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class GroupRole
{
    public int Id { get; set; }

    public int GroupId { get; set; }

    public int RoleId { get; set; }

    public virtual Group Group { get; set; } = null!;

    public virtual Role Role { get; set; } = null!;
}
