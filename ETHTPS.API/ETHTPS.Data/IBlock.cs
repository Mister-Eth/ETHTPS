using System;

namespace ETHTPS.Data.Core
{
    public interface IBlock : IMeasurement
    {
        int BlockNumber { get; set; }
        int TransactionCount { get; set; }
        double GasUsed { get; set; }
        DateTime Date { get; set; }
        bool Settled { get; set; }
        string Provider { get; set; }
    }
}
