using System;
using System.Threading.Tasks;

using ETHTPS.Data.Extensions.StringExtensions;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

using Newtonsoft.Json;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class ETHTPSContext : DbContext
    {
        public ETHTPSContext()
        {
        }

        public ETHTPSContext(DbContextOptions<ETHTPSContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AccesStat> AccesStats { get; set; }
        public virtual DbSet<Provider> Providers { get; set; }
        public virtual DbSet<ProviderType> ProviderTypes { get; set; }
        public virtual DbSet<TPSData> TPSData { get; set; }
        public virtual DbSet<Network> Networks { get; set; }
        public virtual DbSet<CachedResponse> CachedResponses { get; set; }
        public virtual DbSet<ProviderProperty> ProviderProperties { get; set; }
        public virtual DbSet<LatestEntry> LatestEntries { get; set; }
        public virtual DbSet<MachineConfiguration> MachineConfigurations { get; set; }
        public virtual DbSet<TaskPerformanceMetric> TaskPerformanceMetrics { get; set; }
        public virtual DbSet<MaxTPSEntry> MaxTPSEntries { get; set; }
        public virtual DbSet<DayTPSData> DayTPSData { get; set; }
        public virtual DbSet<HourTPSData> HourTPSData { get; set; }
        public virtual DbSet<MonthTPSData> MonthTPSData { get; set; }
        public virtual DbSet<WeekTPSData> WeekTPSData { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Network>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<AccesStat>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Path).HasMaxLength(255);

                entity.Property(e => e.Project).HasMaxLength(255);
            });

            modelBuilder.Entity<Provider>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.HasOne(d => d.TypeNavigation)
                    .WithMany(p => p.Providers)
                    .HasForeignKey(d => d.Type)
                    .HasConstraintName("FK__Providers__Type__267ABA7A");
            });

            modelBuilder.Entity<ProviderType>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<TPSData>(entity =>
            {
                entity.ToTable("TPSData");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Block).HasMaxLength(255);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.Tps).HasColumnName("TPS");
            });

            modelBuilder.Entity<AccesStat>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Path).HasMaxLength(255);

                entity.Property(e => e.Project).HasMaxLength(255);
            });

            modelBuilder.Entity<CachedResponse>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Json)
                    .IsUnicode(false)
                    .HasColumnName("JSON");

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<ProviderProperty>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.Value).HasMaxLength(255);
            });

            modelBuilder.Entity<LatestEntry>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");
            });

            modelBuilder.Entity<MachineConfiguration>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CPUCoreCount).HasColumnName("CPUCoreCount");

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.TotalRam).HasColumnName("TotalRAM");
            });

            modelBuilder.Entity<TaskPerformanceMetric>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.TaskName).HasMaxLength(255);
            });

            modelBuilder.Entity<MaxTPSEntry>(entity =>
            {
                entity.ToTable("MaxTPSEntries");

                entity.Property(e => e.Id).HasColumnName("ID");
            });

            modelBuilder.Entity<DayTPSData>(entity =>
            {
                entity.ToTable("TPSData_Day");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AverageTps).HasColumnName("AverageTPS");

                entity.Property(e => e.StartDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<HourTPSData>(entity =>
            {
                entity.ToTable("TPSData_Hour");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AverageTps).HasColumnName("AverageTPS");

                entity.Property(e => e.StartDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<MonthTPSData>(entity =>
            {
                entity.ToTable("TPSData_Month");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AverageTps).HasColumnName("AverageTPS");

                entity.Property(e => e.StartDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<WeekTPSData>(entity =>
            {
                entity.ToTable("TPSData_Week");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AverageTps).HasColumnName("AverageTPS");

                entity.Property(e => e.StartDate).HasColumnType("datetime");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        public async Task<T> GetCachedResponseAsync<T>(params object[] args)
        {
            var name = StringExtensions.AggregateToLowercase(args);

            if (await CachedResponses.AnyAsync(x => x.Name == name))
            {
                var json = (await CachedResponses.FirstAsync(x => x.Name == name)).Json;
                if (string.IsNullOrWhiteSpace(json))
                {
                    return default(T);
                }
                else
                {
                    return JsonConvert.DeserializeObject<T>(json);
                }
            }
            else
            {
                return default(T);
            }
        }

        public async Task<int> GetProviderIDAsync(string provider) => (await Providers.FirstAsync(x => x.Name.ToUpper() == provider.ToUpper())).Id;

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
