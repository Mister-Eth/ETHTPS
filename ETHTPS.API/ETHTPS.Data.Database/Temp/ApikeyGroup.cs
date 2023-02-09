using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class ApikeyGroup
{
    public int Id { get; set; }

    public int ApikeyId { get; set; }

    public int GroupId { get; set; }

    public virtual Apikey Apikey { get; set; } = null!;

    public virtual Group Group { get; set; } = null!;
}
