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
        private ServiceState _state = ServiceState.Stopped;
        private readonly ProcessStartInfo _processStartInfo;
        private bool _outputsRedirected = false;
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
            _processStartInfo = new ProcessStartInfo(_filePath)
            {
                WorkingDirectory = Directory,
                Arguments = string.Join(" ", Parameters),
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                CreateNoWindow = true
            };
            _process.StartInfo = _processStartInfo;
        }
        public void Start()
        {
            if (State == ServiceState.Stopped)
                KillRunningInstances(); //An instance is already running so we have to kill it

            State = ServiceState.Starting;
            if (_process.Start())
            {
                State = ServiceState.Running;
                if (!_outputsRedirected)
                {
                    _process.OutputDataReceived += _process_OutputDataReceived;
                    _process.ErrorDataReceived += _process_ErrorDataReceived;
                    _process.BeginErrorReadLine();
                    _process.BeginOutputReadLine();
                    _outputsRedirected = true;
                }
            }
        }

        private void _process_ErrorDataReceived(object sender, DataReceivedEventArgs e)
        {
            OnEvent?.Invoke(e.Data, ServiceEventType.Error);
            if (_process.HasExited)
            {
                State = ServiceState.Dead;
                Start();
            }
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
            OutputChanged?.Invoke(this, $"Terminating {ExecutableName}...");
            State = ServiceState.Stopping;
            if (!_process.WaitForExit(TimeSpan.FromSeconds(3)))
            {
                _process.Kill();
                OutputChanged?.Invoke(this, $"Force stopped {ExecutableName}");
            }
            State = ServiceState.Stopped;
        }

        private void KillRunningInstances()
        {
            var chromeDriverProcesses = Process.GetProcesses().
    Where(pr => pr.ProcessName == ExecutableName.Replace(".exe", string.Empty));

            foreach (var process in chromeDriverProcesses)
            {
                process.Kill();
            }
        }
    }
}
