using Giveaway.Web.Database.Persistence.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Giveaway.Web.Database.Persistence.Configurations;

public sealed class ListingEntityConfiguration : IEntityTypeConfiguration<ListingEntity>
{
    public void Configure(EntityTypeBuilder<ListingEntity> builder)
    {
        builder.ToTable("Listings", "dbo");

        builder.HasKey(b => b.Id);

        builder.Property(b => b.CategoryId)
            .IsRequired();

        builder.Property(b => b.Title)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(b => b.Description)
            .HasMaxLength(1000)
            .IsRequired();

        builder.Property(b => b.CreatedAt)
            .IsRequired();

        builder.Property(b => b.LastModifiedAt)
            .IsRequired();
    }
}
