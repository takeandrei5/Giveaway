using Database.Persistence.Configurations;
using Database.Persistence.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database;

public sealed class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
    {

    }

    public DbSet<ItemEntity> Items { get; set; } = null!;

    public DbSet<ListingEntity> Listings { get; set; } = null!;

    public DbSet<UserEntity> Users { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("SQL_Latin1_General_CP1_CS_AS");

        new ItemEntityConfiguration().Configure(modelBuilder.Entity<ItemEntity>());
        new ListingEntityConfiguration().Configure(modelBuilder.Entity<ListingEntity>());
        new UserEntityConfiguration().Configure(modelBuilder.Entity<UserEntity>());
    }
}
