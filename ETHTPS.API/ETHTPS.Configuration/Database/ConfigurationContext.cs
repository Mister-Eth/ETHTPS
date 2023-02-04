using ETHTPS.Data.Core;

using Microsoft.EntityFrameworkCore;

namespace ETHTPS.Configuration.Database;

public partial class ConfigurationContext : ContextBase<ConfigurationContext>
{
    public ConfigurationContext()
    {

    }

    public ConfigurationContext(DbContextOptions<ConfigurationContext> options)
        : base(options)
    {

    }

    public virtual DbSet<Environment> Environments { get; set; }

    public virtual DbSet<Microservice> Microservices { get; set; }

    public virtual DbSet<MicroserviceConfigurationString> MicroserviceConfigurationStrings { get; set; }

    public virtual DbSet<Provider> Providers { get; set; }
    public virtual DbSet<ConfigurationString> ConfigurationStrings { get; set; }

    public virtual DbSet<ProviderConfigurationString> ProviderConfigurationStrings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ConfigurationString>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Configur__3214EC270FABEC9B");

            entity.ToTable("ConfigurationStrings", "Configuration");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Value).HasMaxLength(255);
        });

      
        modelBuilder.Entity<Environment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Environm__3214EC27D353D7B2");

            entity.ToTable("Environments", "Configuration");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<Microservice>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Microser__3214EC27B5F7310C");

            entity.ToTable("Microservices", "Microservices");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<MicroserviceConfigurationString>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Microser__3214EC271CD0FBDD");

            entity.ToTable("MicroserviceConfigurationStrings", "Configuration");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ConfigurationStringId).HasColumnName("ConfigurationStringID");
            entity.Property(e => e.EnvironmentId).HasColumnName("EnvironmentID");
            entity.Property(e => e.MicroserviceId).HasColumnName("MicroserviceID");

            entity.HasOne(d => d.ConfigurationString).WithMany(p => p.MicroserviceConfigurationStrings)
                .HasForeignKey(d => d.ConfigurationStringId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Microserv__Confi__4959E263");

            entity.HasOne(d => d.Environment).WithMany(p => p.MicroserviceConfigurationStrings)
                .HasForeignKey(d => d.EnvironmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Microserv__Envir__4A4E069C");

            entity.HasOne(d => d.Microservice).WithMany(p => p.MicroserviceConfigurationStrings)
                .HasForeignKey(d => d.MicroserviceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Microserv__Micro__4865BE2A");
        });

      

        modelBuilder.Entity<Provider>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Provider__3214EC2720D7D6EB");

            entity.HasIndex(e => e.Name, "UQ__Provider__737584F60991B0F2").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Color)
                .HasMaxLength(16)
                .IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.TheoreticalMaxTps).HasColumnName("TheoreticalMaxTPS");

            entity.HasOne(d => d.SubchainOfNavigation).WithMany(p => p.InverseSubchainOfNavigation)
                .HasForeignKey(d => d.SubchainOf)
                .HasConstraintName("FK__Providers__Subch__4E53A1AA");
        });

        modelBuilder.Entity<ProviderConfigurationString>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Provider__3214EC27FE2E13DB");

            entity.ToTable("ProviderConfigurationStrings", "Configuration");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ConfigurationStringId).HasColumnName("ConfigurationStringID");
            entity.Property(e => e.EnvironmentId).HasColumnName("EnvironmentID");
            entity.Property(e => e.ProviderId).HasColumnName("ProviderID");

            entity.HasOne(d => d.ConfigurationString).WithMany(p => p.ProviderConfigurationStrings)
                .HasForeignKey(d => d.ConfigurationStringId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ProviderC__Confi__3A179ED3");

            entity.HasOne(d => d.Environment).WithMany(p => p.ProviderConfigurationStrings)
                .HasForeignKey(d => d.EnvironmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ProviderC__Envir__3B0BC30C");

            entity.HasOne(d => d.Provider).WithMany(p => p.ProviderConfigurationStrings)
                .HasForeignKey(d => d.ProviderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ProviderC__Provi__39237A9A");
        });

       

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
