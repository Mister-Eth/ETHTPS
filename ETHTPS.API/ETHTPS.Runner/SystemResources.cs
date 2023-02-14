namespace ETHTPS.Runner
{
    public class SystemResources
    {
        private const int PADDING = 7;
        public SystemResource CPU { get; private set; } = new("CPU", "%", PADDING)
        {
            Max = 100
        };
        public SystemResource MemoryMB { get; private set; } = new("Memory", "MB", PADDING);
        public SystemResource NetworkMbit { get; set; } = new("Network", "Mb", PADDING);
    }
}
