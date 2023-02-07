namespace ETHTPS.Data.Integrations.MSSQL
{
    public abstract class TPSAndGasDataBase
    {
        public int Id { get; set; }
        public int Network { get; set; }
        public int Provider { get; set; }
        public virtual Network NetworkNavigation { get; set; }
        public virtual Provider ProviderNavigation { get; set; }
    }
}
