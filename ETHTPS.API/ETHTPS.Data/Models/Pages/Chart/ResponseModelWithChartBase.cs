namespace ETHTPS.Data.Models.Pages.Chart
{
    public abstract class ResponseModelWithChartBase : IResponseModel
    {
        public ChartData ChartData { get; set; }
    }
}
