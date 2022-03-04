﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Database.Persistence.Entities;
using Giveaway.Extensions;

namespace Giveaway.Database.Persistence.Configurations;
public sealed class ItemEntityConfiguration : IEntityTypeConfiguration<ItemEntity>
{
    public void Configure(EntityTypeBuilder<ItemEntity> builder)
    {
        builder.ToTable("Items", "dbo");

        builder.HasKey(x => x.Id);

        builder.BelongsTo<ItemEntity, ListingEntity>(x => x.ListingId);

        builder.Property(x => x.Title)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.Description)
            .HasMaxLength(80)
            .IsRequired();

        builder.Property(x => x.CreatedAt)
            .HasDefaultValueSql("GETUTCDATE()")
            .IsRequired();

        builder.Property(x => x.LastModifiedAt)
            .HasDefaultValueSql("GETUTCDATE()")
            .IsRequired();
    }
}
