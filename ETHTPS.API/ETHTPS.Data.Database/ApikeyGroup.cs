using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL;

public partial class ApikeyGroup
{
    public int Id { get; set; }

    public int ApikeyId { get; set; }

    public int GroupId { get; set; }

    public virtual Apikey Apikey { get; set; }

    public virtual Group Group { get; set; }
}
