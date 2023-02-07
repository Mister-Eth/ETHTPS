using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL;

public partial class PermissionsForRole
{
    public int Id { get; set; }

    public int RoleId { get; set; }

    public int PermissionId { get; set; }

    public virtual Permission Permission { get; set; }

    public virtual Role Role { get; set; }
}
