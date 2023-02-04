using ETHTPS.Data.ResponseModels.SocialMedia;

using System.Collections.Generic;

namespace ETHTPS.API.Core.Infrastructure.Services.Info
{
    public interface ISocialMediaLinksInfoService
    {
        public ProviderSocialMediaLinksResponseModel GetProviderSocialMediaLinks(string providerName);
    }
}
