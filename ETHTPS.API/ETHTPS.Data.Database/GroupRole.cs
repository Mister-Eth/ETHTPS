using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL;

public partial class GroupRole
{
    public int Id { get; set; }

    public int GroupId { get; set; }

    public int RoleId { get; set; }

    public virtual Group Group { get; set; }

    public virtual Role Role { get; set; }
}
