using Giveaway.Web.Database.Persistence.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Giveaway.Web.Database.Persistence.Configurations;

public sealed class UserEntityConfiguration : IEntityTypeConfiguration<UserEntity>
{
    public void Configure(EntityTypeBuilder<UserEntity> builder)
    {
        builder.ToTable("Users");

        builder.HasKey(b => b.Id);

        builder.Property(b => b.Email)
            .IsRequired();

        builder.Property(b => b.Name)
            .IsRequired();

        builder.Property(b => b.Image)
            .IsRequired();
    }
}
