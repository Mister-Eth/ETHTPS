using System.ComponentModel.Design.Serialization;
using System.Diagnostics;

namespace ETHTPS.Runner
{
    public class Service
    {
        private readonly string _filePath;
        private Process _process;

        public event EventHandler<string>? OutputChanged;
        public event EventHandler<ServiceEventType>? OnEvent;
        public string Name { get; private set; }
        public string Directory { get; private set; }
        public string ExecutableName { get; private set; }
        public string?[] Parameters { get; private set; }
        public bool IsRunning => State != ServiceState.Stopped;
        public SystemResources ResourceUsage { get; private set; } = new();
        private ServiceState _state;
        public ServiceState State
        {
            get { return _state; }
            set
            {
                OnEvent?.Invoke(value, ServiceEventType.StateChanged);
                _state = value;
            }
        }
        public Service(string name, string directory, string executableName, params string[] parameters)
        {
            Name = name;
            Directory = directory;
            ExecutableName = executableName;
            Parameters = parameters;

            _filePath = Path.Combine(directory, executableName);
            if (!File.Exists(_filePath))
                throw new ArgumentException($"File {_filePath} not found");

            _process = new Process();
        }
        public void Start()
        {
            State = ServiceState.Starting;
            _process.StartInfo = new ProcessStartInfo(_filePath, string.Join(" ", Parameters))
            {
                UseShellExecute = false,
                RedirectStandardOutput = true,
                CreateNoWindow = true
            };
            _process.OutputDataReceived += _process_OutputDataReceived;
            _process.Start();
            State = ServiceState.Running;
        }

        private void _process_OutputDataReceived(object sender, DataReceivedEventArgs e)
        {
            string s = string.Empty;
            if (e.Data != null)
            {
                s = e.Data.ToString();
            }
            OutputChanged?.Invoke(sender, s);
        }

        public void Kill()
        {
            //Kill
            State = ServiceState.Stopping;
            _process.Kill();
            State = ServiceState.Stopped;
        }
    }
}
