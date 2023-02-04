using ETHTPS.Configuration.Database.Initialization;
using ETHTPS.Data.Core;

namespace ETHTPS.Configuration.Database
{
    public class PublicDataInitializer : DataInitializerBase
    {
        public PublicDataInitializer(IDBConfigurationProvider provider) : base(provider)
        {
           
        }

        public override void Initialize()
        {
            _provider.AddEnvironments("Debug", "Staging", "Release", "All");

        }
    }
}
