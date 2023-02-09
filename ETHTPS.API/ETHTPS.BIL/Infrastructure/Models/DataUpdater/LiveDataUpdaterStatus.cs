﻿namespace ETHTPS.API.BIL.Infrastructure.Models.DataUpdater
{
    public class LiveUpdaterStatus
    {
        public string Updater { get; set; }
        public string Status { get; set; }
        public string UpdaterType { get; set; }
        public DateTime? LastSuccessfulRunTime { get; set; }
        public int NumberOfSuccesses { get; set; }
        public int NumberOfFailures { get; set; }
    }
}
