using Konsole;

namespace ETHTPS.Runner
{
    internal class Program
    {
        private static Style DEFAULT_STYLE = Style.WhiteOnRed;
        static async Task Main(string[] args)
        {
            var services = new[]
            {
                //ServiceCreator.GetTaskRunner(),
                ServiceCreator.GetAPI(),
                ServiceCreator.GetWSAPI(),
                ServiceCreator.GetGateway()
            };
            var size = Window.GetHostWidthHeight.Invoke();
            Console.Clear();
            var settings = new WindowSettings()
            {
                Width = size.width,
                Height = size.height,
                SX = 0,
                SY = 0
            };
            var w = Window.OpenBox("Services", settings);
            var consoles = w.SplitColumns(services.Select(x => new Split(size.width / services.Length - 1, x.Name)).ToArray()).ToList();
            var windowedServices = services.Select((s, i) => new WindowedService(s, consoles[i])).ToList();
            var exit = false;
            Console.CancelKeyPress += async (sender, e) =>
            {
                e.Cancel = true;
                await Task.WhenAll(windowedServices.Select(s => Task.Run(() => s.Kill())));
                Environment.Exit(0);
            };
            await Task.WhenAll(windowedServices.Select(s => Task.Run(() => s.Start())));
            while (windowedServices.All(x => x.Running) && !exit)
            {
                await Task.Delay(-1);
            }
        }
    }
}