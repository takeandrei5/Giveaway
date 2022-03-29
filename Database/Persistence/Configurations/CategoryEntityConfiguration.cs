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

        builder.Property(b => b.Category)
            .HasConversion(
                v => v.ToString(),
                v => (CategoryEntity.CategoryEnum)Enum.Parse(typeof(CategoryEntity.CategoryEnum), v))
            .IsRequired();

        builder.HasIndex(b => b.Category);
    }
}
