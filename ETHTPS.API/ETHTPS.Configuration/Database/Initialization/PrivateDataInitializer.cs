using ETHTPS.Configuration.Database.Initialization;
using ETHTPS.Data.Core;

namespace ETHTPS.Configuration.Database
{
    public class PrivateDataInitializer : DataInitializerBase
    {
        private readonly IDBConfigurationProvider _allProvider;
        public PrivateDataInitializer(IDBConfigurationProvider provider) : base(provider)
        {
            _allProvider = provider["All"];
        }

        public override void Initialize()
        {

        }
        private void InitializeStarkware()
        {

        }
        private void InitializeRecaptcha()
        {
            _allProvider.SetConfigurationString(new ConfigurationString()
            {
                Name = "RecaptchaSiteKey",
                Value = "6Le_XTUkAAAAAJKXCh8Cvq6UFvokPtjfTLCp1JAP"
            });
            _allProvider.SetConfigurationString(new ConfigurationString()
            {
                Name = "RecaptchaSecretKey",
                Value = "6Le_XTUkAAAAABYe8IQgbRJpzvzfBfR5pJ0UIR6B"
            });
        }
    }
}
