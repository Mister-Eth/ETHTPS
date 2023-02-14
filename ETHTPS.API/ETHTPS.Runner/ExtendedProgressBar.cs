using Konsole;

namespace ETHTPS.Runner
{
    public class ExtendedProgressBar
    {
        private readonly ProgressBar _progressBar;
        private readonly SystemResource _systemResource;
        public ExtendedProgressBar(ProgressBar progressBar, SystemResource resource)
        {
            _progressBar = progressBar;
            _systemResource = resource;
        }

        public void Refresh()
        {
            _progressBar.Refresh((int)_systemResource.Value, _systemResource.Name);
        }
    }
}
