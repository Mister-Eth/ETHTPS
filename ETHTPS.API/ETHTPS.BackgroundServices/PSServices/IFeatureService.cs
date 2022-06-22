using ETHTPS.Data.Database;
using ETHTPS.Data.Models.Query;

using System.Collections.Generic;

namespace ETHTPS.Services.PSServices
{
    public interface IFeatureService
    {
        public bool IsFeatureEnabled(FeatureQueryModel model);
        public IEnumerable<Feature> GetFeatures(FeatureQueryModel model);
    }
}
