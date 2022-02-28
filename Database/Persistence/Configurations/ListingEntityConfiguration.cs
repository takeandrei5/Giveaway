using Database.Persistence.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Persistence.Configurations;

public sealed class ListingConfiguration : IEntityTypeConfiguration<ListingEntity>
{
    public void Configure(EntityTypeBuilder<ListingEntity> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Title)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.Description)
            .HasMaxLength(250)
            .IsRequired();

        builder.Property(x => x.CreatedAt)
            .HasDefaultValue(DateTime.UtcNow)
            .IsRequired();

        builder.Property(x => x.LastModifiedAt)
            .HasDefaultValue(DateTime.UtcNow)
            .IsRequired();
    }
}
