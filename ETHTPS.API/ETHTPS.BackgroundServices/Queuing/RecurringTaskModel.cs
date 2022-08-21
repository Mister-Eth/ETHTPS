using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.Queuing
{
    public class RecurringTaskModel
    {
        public RecurringTaskModel(string typeName, string providerName)
        {
            TypeName = typeName;
            ProviderName = providerName;
        }

        public string TypeName { get; set; }
        public string ProviderName { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
