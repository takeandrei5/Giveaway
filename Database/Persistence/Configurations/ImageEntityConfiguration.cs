using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Database.Persistence.Entities;
using Giveaway.Extensions;

namespace Giveaway.Database.Persistence.Configurations;

public sealed class ImageEntityConfiguration : IEntityTypeConfiguration<ImageEntity>
{
    public void Configure(EntityTypeBuilder<ImageEntity> builder)
    {
        builder.ToTable("Images", "dbo");

        builder.HasKey(b => b.Id);

        builder.Property(b => b.Url)
            .IsRequired();
    }
}
