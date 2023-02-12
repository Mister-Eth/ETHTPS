using ETHTPS.Data.Core;

namespace ETHTPS.Data.Models.ExternalWebsites
{
    public interface IExternalWebsiteCategory : IIndexed
    {
        public string Name { get; set; }
    }
}
