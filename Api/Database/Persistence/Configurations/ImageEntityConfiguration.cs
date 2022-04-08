using Giveaway.Database.Persistence.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

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
