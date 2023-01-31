﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.ResponseModels.SocialMedia
{
    public class ProviderSocialMediaLinksResponseModel
    {
        public IEnumerable<ProviderSocialMediaLink> Links { get; set; }
        public IEnumerable<ExternalWebsiteBase> ExternalWebsites { get; set; }
    }
}
