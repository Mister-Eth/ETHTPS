using ETHTPS.Runner.Extensions;

using Konsole;

namespace ETHTPS.Runner
{
    public class WindowedService
    {
        private readonly Service _child;
        private readonly IConsole _window;
        private readonly IConsole _statusWindow;
        private readonly IConsole _logWindow;
        private List<ExtendedProgressBar> _resourceProgressBars;
        public bool Running => _child.IsRunning;
        public ServiceState State => _child.State;

        public WindowedService(Service child, IConsole window)
        {
            _child = child;
            _window = window;
            _logWindow = _window;//_window.OpenBox("Log");
            /*
            _statusWindow = _window.SplitTop("Status");
            _resourceProgressBars = new List<ExtendedProgressBar>()
            {
                _child.ResourceUsage.CPU.ToProgressBar(_statusWindow),
                _child.ResourceUsage.MemoryMB.ToProgressBar(_statusWindow),
                _child.ResourceUsage.NetworkMbit.ToProgressBar(_statusWindow),
            };
            */
            _child.OutputChanged += _child_OutputChanged;
            _child.OnEvent += _child_OnEvent;
        }

        public void Start()
        {
            if (!_child.IsRunning)
            {
                _child.Start();
                PrintResourceUse();
            }
        }

        public void Kill()
        {
            _child.Kill();
        }

        private void _child_OnEvent(object? sender, ServiceEventType e)
        {
            switch (e)
            {
                case ServiceEventType.StateChanged:
                    _logWindow.WriteLine($"State changed to {Enum.Parse<ServiceState>(sender?.ToString() ?? "")}");
                    break;
                case ServiceEventType.Error:
                    _logWindow.WriteLine(ConsoleColor.Red, $"Error: {sender}");
                    _logWindow.ForegroundColor = ConsoleColor.White;
                    break;
            }
        }

        private void _child_OutputChanged(object? sender, string e)
        {
            _logWindow.WriteLine(e);
        }

        private void PrintResourceUse()
        {
            if (_statusWindow == null) return;
            int padding = 8;
            _statusWindow.PrintAt(0, 0, $"{"CPU: ".PadLeft(padding)}{_child.ResourceUsage.CPU.Value}%");
            _statusWindow.PrintAt(0, 1, $"{"Memory: ".PadLeft(padding)}{_child.ResourceUsage.MemoryMB.Value}MB/{_child.ResourceUsage.MemoryMB.Max}MB");
            _statusWindow.PrintAt(0, 2, $"{"Network: ".PadLeft(padding)}{_child.ResourceUsage.NetworkMbit.Value}Mb/s");
            _statusWindow.PrintAt(0, 3, $"State: {_child.State}");
        }
    }
}
