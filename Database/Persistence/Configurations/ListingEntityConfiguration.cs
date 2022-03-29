using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Database.Persistence.Entities;
using Giveaway.Extensions;
using Newtonsoft.Json;

namespace Giveaway.Database.Persistence.Configurations;

public sealed class ListingEntityConfiguration : IEntityTypeConfiguration<ListingEntity>
{
    public void Configure(EntityTypeBuilder<ListingEntity> builder)
    {
        builder.ToTable("Listings", "dbo");

        builder.HasKey(b => b.Id);

        builder.BelongsTo<ListingEntity, CategoryEntity>(b => b.CategoryId);

        builder.Property(b => b.Images)
            .HasConversion(
                v => JsonConvert.SerializeObject(v,
                    new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
                v => JsonConvert.DeserializeObject<IEnumerable<ListingEntity.Image>>(v,
                    new JsonSerializerSettings
                    {
                        NullValueHandling = NullValueHandling.Ignore,
                        ConstructorHandling = ConstructorHandling.AllowNonPublicDefaultConstructor
                    })!)
            .IsRequired();

        builder.Property(b => b.CategoryId)
            .IsRequired();

        builder.Property(b => b.Title)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(b => b.Description)
            .HasMaxLength(250)
            .IsRequired();

        builder.Property(b => b.CreatedAt)
            .HasDefaultValueSql("GETUTCDATE()")
            .IsRequired();

        builder.Property(b => b.LastModifiedAt)
            .HasDefaultValueSql("GETUTCDATE()")
            .IsRequired();
    }
}
