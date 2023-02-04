using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Configuration
{
    public interface IEnvironmentProvider
    {
        IEnumerable<string> GetEnvironments();
        void AddEnvironments(params string[] environments);
    }
}
