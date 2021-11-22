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
        public virtual DbSet<CachedResponse> CachedResponses { get; set; }
        public virtual DbSet<Network> Networks { get; set; }
        public virtual DbSet<Provider> Providers { get; set; }
        public virtual DbSet<ProviderProperty> ProviderProperties { get; set; }
        public virtual DbSet<ProviderType> ProviderTypes { get; set; }
        public virtual DbSet<ProviderTypeProperty> ProviderTypeProperties { get; set; }
        public virtual DbSet<TpsandGasDataDay> TpsandGasDataDays { get; set; }
        public virtual DbSet<TpsandGasDataHour> TpsandGasDataHours { get; set; }
        public virtual DbSet<TpsandGasDataMax> TpsandGasDataMaxes { get; set; }
        public virtual DbSet<TpsandGasDataMonth> TpsandGasDataMonths { get; set; }
        public virtual DbSet<TpsandGasDataWeek> TpsandGasDataWeeks { get; set; }
        public virtual DbSet<TpsandGasDataLatest> TpsandGasDataLatests { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<AccesStat>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Path)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Project)
                    .IsRequired()
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<CachedResponse>(entity =>
            {
                entity.HasIndex(e => e.Name, "UQ__CachedRe__737584F63DE80A10")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Json)
                    .IsUnicode(false)
                    .HasColumnName("JSON");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<Network>(entity =>
            {
                entity.HasIndex(e => e.Name, "UQ__Networks__737584F6D329C49A")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<TpsandGasDataLatest>(entity =>
            {
                entity.ToTable("TPSAndGasData_Latest");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Gps).HasColumnName("GPS");

                entity.Property(e => e.Tps).HasColumnName("TPS");

                entity.HasOne(d => d.NetworkNavigation)
                    .WithMany(p => p.TpsandGasDataLatests)
                    .HasForeignKey(d => d.Network)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TPSAndGas__Netwo__787EE5A0");

                entity.HasOne(d => d.ProviderNavigation)
                    .WithMany(p => p.TpsandGasDataLatests)
                    .HasForeignKey(d => d.Provider)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TPSAndGas__Provi__778AC167");
            });

            modelBuilder.Entity<Provider>(entity =>
            {
                entity.HasIndex(e => e.Name, "UQ__Provider__737584F6B7368E0F")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.HasOne(d => d.TypeNavigation)
                    .WithMany(p => p.Providers)
                    .HasForeignKey(d => d.Type)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Providers__Type__3F466844");
            });

            modelBuilder.Entity<ProviderProperty>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.HasOne(d => d.ProviderNavigation)
                    .WithMany(p => p.ProviderProperties)
                    .HasForeignKey(d => d.Provider)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProviderP__Provi__412EB0B6");
            });

            modelBuilder.Entity<ProviderType>(entity =>
            {
                entity.HasIndex(e => e.Name, "UQ__Provider__737584F6267CCF6F")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<ProviderTypeProperty>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.HasOne(d => d.ProviderTypeNavigation)
                    .WithMany(p => p.ProviderTypeProperties)
                    .HasForeignKey(d => d.ProviderType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProviderT__Provi__403A8C7D");
            });

            modelBuilder.Entity<TpsandGasDataDay>(entity =>
            {
                entity.ToTable("TPSAndGasData_Day");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AverageGps).HasColumnName("AverageGPS");

                entity.Property(e => e.AverageTps).HasColumnName("AverageTPS");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.OclhJson).IsUnicode(false).HasColumnName("OCLH_JSON");

                entity.HasOne(d => d.NetworkNavigation)
                    .WithMany(p => p.TpsandGasDataDays)
                    .HasForeignKey(d => d.Network)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TPSAndGas__Netwo__48CFD27E");

                entity.HasOne(d => d.ProviderNavigation)
                    .WithMany(p => p.TpsandGasDataDays)
                    .HasForeignKey(d => d.Provider)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TPSAndGas__Provi__47DBAE45");
            });

            modelBuilder.Entity<TpsandGasDataHour>(entity =>
            {
                entity.ToTable("TPSAndGasData_Hour");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AverageGps).HasColumnName("AverageGPS");

                entity.Property(e => e.AverageTps).HasColumnName("AverageTPS");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.OclhJson).IsUnicode(false).HasColumnName("OCLH_JSON");

                entity.HasOne(d => d.NetworkNavigation)
                    .WithMany(p => p.TpsandGasDataHours)
                    .HasForeignKey(d => d.Network)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TPSAndGas__Netwo__46E78A0C");

                entity.HasOne(d => d.ProviderNavigation)
                    .WithMany(p => p.TpsandGasDataHours)
                    .HasForeignKey(d => d.Provider)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TPSAndGas__Provi__45F365D3");
            });

            modelBuilder.Entity<TpsandGasDataMax>(entity =>
            {
                entity.ToTable("TPSAndGasData_Max");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.MaxGps).HasColumnName("MaxGPS");

                entity.Property(e => e.MaxTps).HasColumnName("MaxTPS");

                entity.HasOne(d => d.NetworkNavigation)
                    .WithMany(p => p.TpsandGasDataMaxes)
                    .HasForeignKey(d => d.Network)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TPSAndGas__Netwo__44FF419A");

                entity.HasOne(d => d.ProviderNavigation)
                    .WithMany(p => p.TpsandGasDataMaxes)
                    .HasForeignKey(d => d.Provider)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TPSAndGas__Provi__440B1D61");
            });

            modelBuilder.Entity<TpsandGasDataMonth>(entity =>
            {
                entity.ToTable("TPSAndGasData_Month");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AverageGps).HasColumnName("AverageGPS");

                entity.Property(e => e.AverageTps).HasColumnName("AverageTPS");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.OclhJson).IsUnicode(false).HasColumnName("OCLH_JSON");

                entity.HasOne(d => d.NetworkNavigation)
                    .WithMany(p => p.TpsandGasDataMonths)
                    .HasForeignKey(d => d.Network)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TPSAndGas__Netwo__4CA06362");

                entity.HasOne(d => d.ProviderNavigation)
                    .WithMany(p => p.TpsandGasDataMonths)
                    .HasForeignKey(d => d.Provider)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TPSAndGas__Provi__4BAC3F29");
            });

            modelBuilder.Entity<TpsandGasDataWeek>(entity =>
            {
                entity.ToTable("TPSAndGasData_Week");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AverageGps).HasColumnName("AverageGPS");

                entity.Property(e => e.AverageTps).HasColumnName("AverageTPS");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.OclhJson).IsUnicode(false).HasColumnName("OCLH_JSON");

                entity.HasOne(d => d.NetworkNavigation)
                    .WithMany(p => p.TpsandGasDataWeeks)
                    .HasForeignKey(d => d.Network)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TPSAndGas__Netwo__4AB81AF0");

                entity.HasOne(d => d.ProviderNavigation)
                    .WithMany(p => p.TpsandGasDataWeeks)
                    .HasForeignKey(d => d.Provider)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TPSAndGas__Provi__49C3F6B7");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
