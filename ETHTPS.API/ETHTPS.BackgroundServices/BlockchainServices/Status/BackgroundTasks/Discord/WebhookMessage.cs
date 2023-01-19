namespace ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord
{
    public class WebhookMessage
    {
        public string content { get; set; }
        public Embed[] embeds { get; set; }
    }
}
