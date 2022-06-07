using ETHTPS.Data.Database;
using ETHTPS.Data.Extensions.StringExtensions;
using ETHTPS.Data.Models.Query;

using System;
using System.Collections.Generic;
using System.Linq;

namespace ETHTPS.API.Infrastructure.Services.Implementations
{
    public class FeatureService : IFeatureService
    {
        private readonly ETHTPSContext _context;

        public FeatureService(ETHTPSContext context)
        {
            _context = context;
        }

        public IEnumerable<Feature> GetFeatures(FeatureQueryModel model)
        {
            FieldCheck(model);
            return _context.Features.Where(GetQuery(model));
        }

        public bool IsFeatureEnabled(FeatureQueryModel model)
        {
            FieldCheck(model);

            var query = GetQuery(model);
            if (!_context.Features.Any(query))
                throw new ArgumentException("Not found");

            return _context.Features.First(query).Enabled;
        }

        Func<Feature, bool> GetQuery(FeatureQueryModel model)
        {
            var projectID = _context.Projects.AsEnumerable().First(x => x.Name.LossyCompareTo(model.Project) || x.Website.LossyCompareTo(model.Project)).Id;
            Func<Feature, bool> query = x => x.Name.LossyCompareTo(model.FeatureName) && x.ProjectId == projectID;
            if (model.FeatureId != null && model.FeatureId > 0)
            {
                query = x => x.Id == model.FeatureId && x.ProjectId == projectID;
            }
            else if (string.IsNullOrWhiteSpace(model.FeatureName)) 
            {
                throw new ArgumentNullException(nameof(model.FeatureName));
            }
            return query;
        }

        private void FieldCheck(FeatureQueryModel model)
        {
            if (model is null)
                throw new ArgumentNullException(nameof(model));
            if (string.IsNullOrWhiteSpace(model.Project))
                throw new ArgumentNullException(nameof(model.Project));

            if (!_context.Projects.AsEnumerable().Any(x => x.Name.LossyCompareTo(model.Project) || x.Website.LossyCompareTo(model.Project)))
                throw new ArgumentException(nameof(model.Project));
        }
    }
}
