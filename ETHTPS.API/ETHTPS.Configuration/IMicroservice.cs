using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Configuration
{
    public interface IMicroservice
    {
        public string Name { get; set; } 
        public string? Description { get; set; }
    }
}
