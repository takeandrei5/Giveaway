using Giveaway.Web.Database.Persistence.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Giveaway.Web.Database.Persistence.Configurations;

public sealed class ImageEntityConfiguration : IEntityTypeConfiguration<ImageEntity>
{
    public void Configure(EntityTypeBuilder<ImageEntity> builder)
    {
        builder.ToTable("Images", "dbo");

        builder.HasKey(b => b.Id);

        builder.Property(b => b.Url)
            .IsRequired();

        builder.Property(b => b.Index)
            .IsRequired();

        builder.HasIndex(b => new { b.ListingId, b.Index });
    }
}
