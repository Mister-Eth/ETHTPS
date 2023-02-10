using ETHTPS.Data.Core;
using ETHTPS.Data.Models.Query;
using ETHTPS.Data.Models.ResponseModels.ChartData.Nivo;
using ETHTPS.Data.ResponseModels;

namespace ETHTPS.API.BIL.Infrastructure.Services.ChartData
{
    public interface INivoStreamchartDataProvider
    {
        IDictionary<string, IEnumerable<IDictionary<string, DataPoint>>> Get(ProviderQueryModel model, string interval, int count);
    }
}
