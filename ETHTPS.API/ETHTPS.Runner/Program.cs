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
                ServiceCreator.GetTaskRunner(),
                ServiceCreator.GetAPI(),
                ServiceCreator.GetWSAPI()
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
            var consoles = w.SplitColumns(services.Select(x => x.Name).ToArray()).ToList();
            var windowedServices = services.Select((s, i) => new WindowedService(s, consoles[i]));
            Console.CancelKeyPress += (sender, e) =>
            {
                windowedServices.ToList().ForEach(w => w.Kill());
                Console.Clear();
            };
            while (windowedServices.All(x => x.Running))
            {
                await Task.Delay(-1);
            }
        }
    }
}