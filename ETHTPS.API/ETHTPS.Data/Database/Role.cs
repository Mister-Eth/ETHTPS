using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Database;

public partial class Role
{
    public int Id { get; set; }

    public string Name { get; set; }

    public virtual ICollection<GroupRole> GroupRoles { get; } = new List<GroupRole>();

    public virtual ICollection<PermissionsForRole> PermissionsForRoles { get; } = new List<PermissionsForRole>();
}
