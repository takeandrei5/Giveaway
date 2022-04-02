using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Database.Persistence.Entities;

namespace Giveaway.Database.Persistence.Configurations;

public sealed class CategoryEntityConfiguration : IEntityTypeConfiguration<CategoryEntity>
{
    public void Configure(EntityTypeBuilder<CategoryEntity> builder)
    {
        builder.ToTable("Categories", "dbo");

        builder.HasKey(b => b.Id);

        builder.Property(b => b.Name)
            .IsRequired();

        builder.HasIndex(b => b.Name);

        builder.HasData(new List<CategoryEntity>
        {
            new()
            {
                Id = 1,
                Name = "Men Clothes",
            },
            new()
            {
                Id = 2,
                Name = "Women Clothes"
            }
        });
    }
}
