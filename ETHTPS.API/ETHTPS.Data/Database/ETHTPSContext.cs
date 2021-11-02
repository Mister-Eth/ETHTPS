using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

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
        public virtual DbSet<AggregatedCounter> AggregatedCounters { get; set; }
        public virtual DbSet<CachedResponse> CachedResponses { get; set; }
        public virtual DbSet<Counter> Counters { get; set; }
        public virtual DbSet<Hash> Hashes { get; set; }
        public virtual DbSet<Job> Jobs { get; set; }
        public virtual DbSet<JobParameter> JobParameters { get; set; }
        public virtual DbSet<JobQueue> JobQueues { get; set; }
        public virtual DbSet<LatestEntry> LatestEntries { get; set; }
        public virtual DbSet<List> Lists { get; set; }
        public virtual DbSet<MachineConfiguration> MachineConfigurations { get; set; }
        public virtual DbSet<MaxTpsentry> MaxTpsentries { get; set; }
        public virtual DbSet<Network> Networks { get; set; }
        public virtual DbSet<Provider> Providers { get; set; }
        public virtual DbSet<ProviderProperty> ProviderProperties { get; set; }
        public virtual DbSet<ProviderType> ProviderTypes { get; set; }
        public virtual DbSet<Schema> Schemas { get; set; }
        public virtual DbSet<Server> Servers { get; set; }
        public virtual DbSet<Set> Sets { get; set; }
        public virtual DbSet<State> States { get; set; }
        public virtual DbSet<TaskPerformanceMetric> TaskPerformanceMetrics { get; set; }
        public virtual DbSet<TpsdataDay> TpsdataDays { get; set; }
        public virtual DbSet<TpsdataHour> TpsdataHours { get; set; }
        public virtual DbSet<TpsdataMonth> TpsdataMonths { get; set; }
        public virtual DbSet<TpsdataWeek> TpsdataWeeks { get; set; }
        public virtual DbSet<Tpsdatum> Tpsdata { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<AccesStat>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Path).HasMaxLength(255);

                entity.Property(e => e.Project).HasMaxLength(255);
            });

            modelBuilder.Entity<AggregatedCounter>(entity =>
            {
                entity.HasKey(e => e.Key)
                    .HasName("PK_HangFire_CounterAggregated");

                entity.ToTable("AggregatedCounter", "HangFire");

                entity.HasIndex(e => e.ExpireAt, "IX_HangFire_AggregatedCounter_ExpireAt")
                    .HasFilter("([ExpireAt] IS NOT NULL)");

                entity.Property(e => e.Key).HasMaxLength(100);

                entity.Property(e => e.ExpireAt).HasColumnType("datetime");
            });

            modelBuilder.Entity<CachedResponse>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Json)
                    .IsUnicode(false)
                    .HasColumnName("JSON");

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<Counter>(entity =>
            {
                entity.HasKey(e => new { e.Key, e.Id })
                    .HasName("PK_HangFire_Counter");

                entity.ToTable("Counter", "HangFire");

                entity.Property(e => e.Key).HasMaxLength(100);

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.ExpireAt).HasColumnType("datetime");
            });

            modelBuilder.Entity<Hash>(entity =>
            {
                entity.HasKey(e => new { e.Key, e.Field })
                    .HasName("PK_HangFire_Hash");

                entity.ToTable("Hash", "HangFire");

                entity.HasIndex(e => e.ExpireAt, "IX_HangFire_Hash_ExpireAt")
                    .HasFilter("([ExpireAt] IS NOT NULL)");

                entity.Property(e => e.Key).HasMaxLength(100);

                entity.Property(e => e.Field).HasMaxLength(100);
            });

            modelBuilder.Entity<Job>(entity =>
            {
                entity.ToTable("Job", "HangFire");

                entity.HasIndex(e => e.ExpireAt, "IX_HangFire_Job_ExpireAt")
                    .HasFilter("([ExpireAt] IS NOT NULL)");

                entity.HasIndex(e => e.StateName, "IX_HangFire_Job_StateName")
                    .HasFilter("([StateName] IS NOT NULL)");

                entity.Property(e => e.Arguments).IsRequired();

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.ExpireAt).HasColumnType("datetime");

                entity.Property(e => e.InvocationData).IsRequired();

                entity.Property(e => e.StateName).HasMaxLength(20);
            });

            modelBuilder.Entity<JobParameter>(entity =>
            {
                entity.HasKey(e => new { e.JobId, e.Name })
                    .HasName("PK_HangFire_JobParameter");

                entity.ToTable("JobParameter", "HangFire");

                entity.Property(e => e.Name).HasMaxLength(40);

                entity.HasOne(d => d.Job)
                    .WithMany(p => p.JobParameters)
                    .HasForeignKey(d => d.JobId)
                    .HasConstraintName("FK_HangFire_JobParameter_Job");
            });

            modelBuilder.Entity<JobQueue>(entity =>
            {
                entity.HasKey(e => new { e.Queue, e.Id })
                    .HasName("PK_HangFire_JobQueue");

                entity.ToTable("JobQueue", "HangFire");

                entity.Property(e => e.Queue).HasMaxLength(50);

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.FetchedAt).HasColumnType("datetime");
            });

            modelBuilder.Entity<LatestEntry>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.HasOne(d => d.EntryNavigation)
                    .WithMany(p => p.LatestEntries)
                    .HasForeignKey(d => d.Entry)
                    .HasConstraintName("FK__LatestEnt__Entry__398D8EEE");

                entity.HasOne(d => d.ProviderNavigation)
                    .WithMany(p => p.LatestEntries)
                    .HasForeignKey(d => d.Provider)
                    .HasConstraintName("FK__LatestEnt__Provi__38996AB5");
            });

            modelBuilder.Entity<List>(entity =>
            {
                entity.HasKey(e => new { e.Key, e.Id })
                    .HasName("PK_HangFire_List");

                entity.ToTable("List", "HangFire");

                entity.HasIndex(e => e.ExpireAt, "IX_HangFire_List_ExpireAt")
                    .HasFilter("([ExpireAt] IS NOT NULL)");

                entity.Property(e => e.Key).HasMaxLength(100);

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.ExpireAt).HasColumnType("datetime");
            });

            modelBuilder.Entity<MachineConfiguration>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CpucoreCount).HasColumnName("CpucoreCount");

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.TotalRam).HasColumnName("TotalRAM");
            });

            modelBuilder.Entity<MaxTpsentry>(entity =>
            {
                entity.ToTable("MaxTpsentries");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.HasOne(d => d.EntryNavigation)
                    .WithMany(p => p.MaxTpsentries)
                    .HasForeignKey(d => d.Entry)
                    .HasConstraintName("FK__MaxTPSEnt__Entry__6EF57B66");

                entity.HasOne(d => d.ProviderNavigation)
                    .WithMany(p => p.MaxTpsentries)
                    .HasForeignKey(d => d.Provider)
                    .HasConstraintName("FK__MaxTPSEnt__Provi__6E01572D");
            });

            modelBuilder.Entity<Network>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name).HasMaxLength(255);
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

            modelBuilder.Entity<ProviderProperty>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.Value).HasMaxLength(255);

                entity.HasOne(d => d.ProviderNavigation)
                    .WithMany(p => p.ProviderProperties)
                    .HasForeignKey(d => d.Provider)
                    .HasConstraintName("FK__ProviderP__Provi__35BCFE0A");
            });

            modelBuilder.Entity<ProviderType>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<Schema>(entity =>
            {
                entity.HasKey(e => e.Version)
                    .HasName("PK_HangFire_Schema");

                entity.ToTable("Schema", "HangFire");

                entity.Property(e => e.Version).ValueGeneratedNever();
            });

            modelBuilder.Entity<Server>(entity =>
            {
                entity.ToTable("Server", "HangFire");

                entity.HasIndex(e => e.LastHeartbeat, "IX_HangFire_Server_LastHeartbeat");

                entity.Property(e => e.Id).HasMaxLength(200);

                entity.Property(e => e.LastHeartbeat).HasColumnType("datetime");
            });

            modelBuilder.Entity<Set>(entity =>
            {
                entity.HasKey(e => new { e.Key, e.Value })
                    .HasName("PK_HangFire_Set");

                entity.ToTable("Set", "HangFire");

                entity.HasIndex(e => e.ExpireAt, "IX_HangFire_Set_ExpireAt")
                    .HasFilter("([ExpireAt] IS NOT NULL)");

                entity.HasIndex(e => new { e.Key, e.Score }, "IX_HangFire_Set_Score");

                entity.Property(e => e.Key).HasMaxLength(100);

                entity.Property(e => e.Value).HasMaxLength(256);

                entity.Property(e => e.ExpireAt).HasColumnType("datetime");
            });

            modelBuilder.Entity<State>(entity =>
            {
                entity.HasKey(e => new { e.JobId, e.Id })
                    .HasName("PK_HangFire_State");

                entity.ToTable("State", "HangFire");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Reason).HasMaxLength(100);

                entity.HasOne(d => d.Job)
                    .WithMany(p => p.States)
                    .HasForeignKey(d => d.JobId)
                    .HasConstraintName("FK_HangFire_State_Job");
            });

            modelBuilder.Entity<TaskPerformanceMetric>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.TaskName).HasMaxLength(255);

                entity.HasOne(d => d.MachineNavigation)
                    .WithMany(p => p.TaskPerformanceMetrics)
                    .HasForeignKey(d => d.Machine)
                    .HasConstraintName("FK__TaskPerfo__Machi__4316F928");
            });

            modelBuilder.Entity<TpsdataDay>(entity =>
            {
                entity.ToTable("TPSData_Day");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AverageTps).HasColumnName("AverageTPS");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.HasOne(d => d.NetworkNavigation)
                    .WithMany(p => p.TpsdataDays)
                    .HasForeignKey(d => d.Network)
                    .HasConstraintName("FK__TPSData_D__Netwo__07C12930");

                entity.HasOne(d => d.ProviderNavigation)
                    .WithMany(p => p.TpsdataDays)
                    .HasForeignKey(d => d.Provider)
                    .HasConstraintName("FK__TPSData_D__Provi__06CD04F7");
            });

            modelBuilder.Entity<TpsdataHour>(entity =>
            {
                entity.ToTable("TPSData_Hour");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AverageTps).HasColumnName("AverageTPS");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.HasOne(d => d.NetworkNavigation)
                    .WithMany(p => p.TpsdataHours)
                    .HasForeignKey(d => d.Network)
                    .HasConstraintName("FK__TPSData_H__Netwo__03F0984C");

                entity.HasOne(d => d.ProviderNavigation)
                    .WithMany(p => p.TpsdataHours)
                    .HasForeignKey(d => d.Provider)
                    .HasConstraintName("FK__TPSData_H__Provi__02FC7413");
            });

            modelBuilder.Entity<TpsdataMonth>(entity =>
            {
                entity.ToTable("TPSData_Month");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AverageTps).HasColumnName("AverageTPS");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.HasOne(d => d.NetworkNavigation)
                    .WithMany(p => p.TpsdataMonths)
                    .HasForeignKey(d => d.Network)
                    .HasConstraintName("FK__TPSData_M__Netwo__0F624AF8");

                entity.HasOne(d => d.ProviderNavigation)
                    .WithMany(p => p.TpsdataMonths)
                    .HasForeignKey(d => d.Provider)
                    .HasConstraintName("FK__TPSData_M__Provi__0E6E26BF");
            });

            modelBuilder.Entity<TpsdataWeek>(entity =>
            {
                entity.ToTable("TPSData_Week");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AverageTps).HasColumnName("AverageTPS");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.HasOne(d => d.NetworkNavigation)
                    .WithMany(p => p.TpsdataWeeks)
                    .HasForeignKey(d => d.Network)
                    .HasConstraintName("FK__TPSData_W__Netwo__0B91BA14");

                entity.HasOne(d => d.ProviderNavigation)
                    .WithMany(p => p.TpsdataWeeks)
                    .HasForeignKey(d => d.Provider)
                    .HasConstraintName("FK__TPSData_W__Provi__0A9D95DB");
            });

            modelBuilder.Entity<Tpsdatum>(entity =>
            {
                entity.ToTable("TPSData");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Block).HasMaxLength(255);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.Tps).HasColumnName("TPS");

                entity.HasOne(d => d.NetworkNavigation)
                    .WithMany(p => p.Tpsdata)
                    .HasForeignKey(d => d.Network)
                    .HasConstraintName("FK__TPSData__Network__32E0915F");

                entity.HasOne(d => d.ProviderNavigation)
                    .WithMany(p => p.Tpsdata)
                    .HasForeignKey(d => d.Provider)
                    .HasConstraintName("FK__TPSData__Provide__2C3393D0");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
