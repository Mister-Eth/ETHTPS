using ETHTPS.Data.Core.Models.DataPoints.XYPoints;

using System.Collections.Generic;
using System.Linq;

namespace ETHTPS.Data.Core.Models.ResponseModels.L2s
{
    /// <summary>
    /// An object used for responsding to L2 data requests
    /// </summary>
    public class L2DataResponseModel
    {
        /// <summary>
        /// This field is set when data is requested for a single provider
        /// </summary>
        public Dataset? Data { get; set; }

        private IEnumerable<Dataset>? _datasets;
        /// <summary>
        /// This field is set when data is requested for multiple providers.
        /// </summary>
        public IEnumerable<Dataset>? Datasets
        {
            get
            {
                return _datasets;
            }
            set
            {
                //Use the Data property if there's only one dataset
                if (value.Count() == 1)
                {
                    Data = value.FirstOrDefault();
                }
                else
                {
                    _datasets = value;
                }
            }
        }
        public DataType? DataType { get; set; } = null;
    }
}
