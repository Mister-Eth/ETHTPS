using ETHTPS.Data.Core;

namespace ETHTPS.Data.Core.Models.ExternalWebsites
{
    public interface IExternalWebsiteCategory : IIndexed
    {
        public string Name { get; set; }
    }
}
