using ETHTPS.Data.Database;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.BackgroundServices.Infrastructure.Performance.Tasks.Extensions
{
    public static class TaskPerformanceExtensions
    {
        private static MachineConfiguration CurrentMachine { get; set; }
        public static MachineConfiguration GetOrInsertCurrentMachineConfiguration(this ETHTPSContext context)
        {
            if (CurrentMachine == null) //Only call once
            {
                var currentMachineConfiguration = new MachineConfiguration()
                {
                    Name = Environment.MachineName,
                    CpucoreCount = Environment.ProcessorCount,
                    TotalRam = (int)GetTotalVisibleMemory()
                };
                Func<MachineConfiguration, bool> filter = x => x.Name == currentMachineConfiguration.Name && x.TotalRam == currentMachineConfiguration.TotalRam && x.CpucoreCount == currentMachineConfiguration.CpucoreCount;
                if (!context.MachineConfigurations.Any(filter))
                {
                    context.MachineConfigurations.Add(currentMachineConfiguration);
                    context.SaveChanges();
                }
                CurrentMachine = context.MachineConfigurations.First(filter);
            }
            return CurrentMachine;
        }

        private static double GetTotalVisibleMemory()
        {
            var gcMemoryInfo = GC.GetGCMemoryInfo();
            var installedMemory = gcMemoryInfo.TotalAvailableMemoryBytes;
            // it will give the size of memory in MB
            var physicalMemory = (double)installedMemory / 1048576.0;
            return physicalMemory;
        }
    }
}
