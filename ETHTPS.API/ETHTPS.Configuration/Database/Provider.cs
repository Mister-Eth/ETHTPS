using System;
using System.Collections.Generic;

namespace ETHTPS.Configuration.Database;

public partial class Provider
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int Type { get; set; }

    public string Color { get; set; } = null!;

    public bool? IsGeneralPurpose { get; set; }

    public int? HistoricalAggregationDeltaBlock { get; set; }

    public bool Enabled { get; set; }

    public int? SubchainOf { get; set; }

    public int TheoreticalMaxTps { get; set; }

    public virtual ICollection<Provider> InverseSubchainOfNavigation { get; } = new List<Provider>();

    public virtual ICollection<ProviderConfigurationString> ProviderConfigurationStrings { get; } = new List<ProviderConfigurationString>();

    public virtual Provider? SubchainOfNavigation { get; set; }
}
