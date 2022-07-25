using Giveaway.Commons.Interfaces;
using Giveaway.Web.Database.Persistence.Configurations;
using Giveaway.Web.Database.Persistence.Entities;
using Microsoft.EntityFrameworkCore;

namespace Giveaway.Web.Database;

public sealed class AppDbContext : DbContext
{
    private readonly ILoggedUser _loggedUser;

    public AppDbContext(DbContextOptions<AppDbContext> options, ILoggedUser loggedUser) : base(options) =>
        _loggedUser = loggedUser;

    public DbSet<CategoryEntity> Categories { get; set; } = null!;

    public DbSet<ImageEntity> Images { get; set; } = null!;

    public DbSet<ListingEntity> Listings { get; set; } = null!;

    public DbSet<UserEntity> Users { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("SQL_Latin1_General_CP1_CS_AS");

        new CategoryEntityConfiguration().Configure(modelBuilder.Entity<CategoryEntity>());
        new ImageEntityConfiguration().Configure(modelBuilder.Entity<ImageEntity>());
        new ListingEntityConfiguration().Configure(modelBuilder.Entity<ListingEntity>());
        new UserEntityConfiguration().Configure(modelBuilder.Entity<UserEntity>());

        modelBuilder.Entity<ListingEntity>()
           .HasQueryFilter(query => query.OwnerId
                                    == Users.Where(user => user.Email == _loggedUser.GetEmailFromClaims())
                                       .Select(user => user.Id)
                                       .Single());
    }

    public override int SaveChanges()
    {
        AddTimestamps();
        return base.SaveChanges();
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        AddTimestamps();
        return await base.SaveChangesAsync(cancellationToken);
    }

    private void AddTimestamps()
    {
        var entities = ChangeTracker.Entries()
           .Where(entity => entity.Entity is ListingEntity
                            && (entity.State == EntityState.Added || entity.State == EntityState.Modified))
           .ToList();

        if (!entities.Any())
            return;

        foreach (var entity in entities)
        {
            if (entity.State == EntityState.Added)
                ((ListingEntity)entity.Entity).CreatedAt = DateTime.UtcNow;

            ((ListingEntity)entity.Entity).LastModifiedAt = DateTime.UtcNow;
        }
    }
}
