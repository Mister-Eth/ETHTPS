using ETHTPS.Data.Core;

namespace ETHTPS.Data.Models.ExternalWebsites
{
    public interface IExternalWebsite : IIndexed
    {
        public string Name { get; set; }

        public string IconBase64 { get; set; }

        public int Category { get; set; }
    }
}
