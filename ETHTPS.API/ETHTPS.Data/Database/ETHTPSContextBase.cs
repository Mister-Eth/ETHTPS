using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database
{
    public abstract class EthtpsContextBase : DbContext
    {
        public readonly object LockObj = new object();
        public EthtpsContextBase()
        {
            Database.SetCommandTimeout(TimeSpan.FromSeconds(10));
        }

        public EthtpsContextBase(DbContextOptions<EthtpsContext> options)
            : base(options)
        {
            Database.SetCommandTimeout(TimeSpan.FromSeconds(60));
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseLazyLoadingProxies();
        }

    }
}
