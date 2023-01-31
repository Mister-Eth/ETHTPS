using ETHTPS.Data.Database;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.ResponseModels.SocialMedia
{
    public class ExternalWebsiteBase : EntityWIthId
    {

        public string Name { get; set; }

        public string IconBase64 { get; set; }

        public string Category { get; set; }
    }
}
