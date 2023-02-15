namespace ETHTPS.Data.Core.Models.Pages.Chart
{
    public abstract class ResponseModelWithChartBase : IResponseModel
    {
        public ChartData ChartData { get; set; }
    }
}
