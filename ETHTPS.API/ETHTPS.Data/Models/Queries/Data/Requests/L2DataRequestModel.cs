using ETHTPS.Data.Core.Extensions;
using ETHTPS.Data.Core.Models.DataPoints.XYPoints;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;

namespace ETHTPS.Data.Core.Models.Queries.Data.Requests
{
    public class L2DataRequestModel : ProviderQueryModel
    {
        [JsonIgnore]
        public TimeInterval AutoInterval
        {
            get
            {
                StartDate ??= DateTime.Now;
                EndDate ??= DateTime.Now;
                return (EndDate.Value - StartDate.Value).GetClosestInterval();
            }
        }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public BucketOptions BucketOptions { get; set; } = new();
        public XPointType ReturnTypeXAxisType { get; set; } = XPointType.Date;
        public ReturnCollectionType ReturnCollectionType { get; set; }
        private List<string> _providers = new();

        /// <summary>
        /// Whether to include basic data analysis such as min, max, average in the result
        /// </summary>
        public bool IncludeBasicAnalysis { get; set; } = true;

        /// <summary>
        /// Whether to include more complex analysis in the result
        /// </summary>
        public bool IncludeComplexAnalysis { get; set; } = false;

        /// <summary>
        /// Used in case data for multiple providers is requested. Always returns a distinct list of providers that includes the 
        /// Provider field of the <see cref="ProviderQueryModel"/> base class.
        /// </summary>
        public List<string> Providers
        {
            get
            {
                if (Provider != null)
                    _providers.Add(Provider);
                return _providers.Distinct().ToList();
            }
            set
            {
                _providers = value;
            }
        }

        public ValidationResult Validate()
        {
            if (StartDate == null && EndDate == null)
            {
                return ValidationResult.InvalidFor($"Both {nameof(StartDate)} and {nameof(EndDate)} are null");
            }
            if (StartDate != null && EndDate != null)
            {
                if (EndDate < StartDate)
                {
                    return ValidationResult.InvalidFor($"{nameof(EndDate)} can't be earlier than {nameof(StartDate)}");
                }
            }
            if (BucketOptions.CustomBucketSize.HasValue)
            {
                if (BucketOptions.BucketSize != TimeInterval.Auto)
                {
                    return ValidationResult.InvalidFor($"Can't specify both {nameof(BucketOptions.BucketSize)} and {nameof(BucketOptions.CustomBucketSize)}");
                }
            }
            if (Providers.Count == 0)
            {
                return ValidationResult.InvalidFor("No provider(s) specified");
            }
            return ValidationResult.Valid;
        }
    }
}
