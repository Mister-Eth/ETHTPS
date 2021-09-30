using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ETHTPS.API.Infrastructure.Database.Models
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
        public virtual DbSet<TPSData> Tpsdata { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

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

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
