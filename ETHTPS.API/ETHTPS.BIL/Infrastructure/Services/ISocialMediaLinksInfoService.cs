using ETHTPS.Data.ResponseModels.SocialMedia;

using System.Collections.Generic;

namespace ETHTPS.API.BIL.Infrastructure.Services
{
    public interface ISocialMediaLinksInfoService
    {
        public ProviderSocialMediaLinksResponseModel GetProviderSocialMediaLinks(string providerName);
    }
}
