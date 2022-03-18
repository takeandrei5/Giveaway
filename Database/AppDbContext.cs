using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Database.Persistence.Configurations;
using Giveaway.Database.Persistence.Entities;
using Giveaway.Database;
using Giveaway.Application.Interfaces;

namespace Giveaway.Database;

public sealed class AppDbContext : DbContext
{
    private readonly ILoggedUser _loggedUser;

    public AppDbContext(DbContextOptions<AppDbContext> options, ILoggedUser loggedUser) : base(options)
        => _loggedUser = loggedUser;

    public DbSet<ItemEntity> Items { get; set; } = null!;

    public DbSet<ListingEntity> Listings { get; set; } = null!;

    public DbSet<UserEntity> Users { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("SQL_Latin1_General_CP1_CS_AS");

        new ItemEntityConfiguration().Configure(modelBuilder.Entity<ItemEntity>());
        new ListingEntityConfiguration().Configure(modelBuilder.Entity<ListingEntity>());
        new UserEntityConfiguration().Configure(modelBuilder.Entity<UserEntity>());

        modelBuilder.Entity<ListingEntity>()
            .HasQueryFilter(query => query.OwnerId == Users.Where(user => user.Email == _loggedUser.GetEmailFromToken())
                .Select(user => user.Id)
                .Single());
    }
}
