using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Extensions;

public static class EntityTypeBuilderExtensions
{
    public static ReferenceCollectionBuilder<U, T> BelongsTo<T, U>(this EntityTypeBuilder<T> entity, Expression<Func<T, object?>> key)
        where T : class
        where U : class =>
        entity.HasOne<U>()
            .WithMany()
            .HasForeignKey(key)
            .OnDelete(DeleteBehavior.Restrict);

    public static ReferenceReferenceBuilder LinkedTo<T, U>(this EntityTypeBuilder<T> entity, Expression<Func<T, object?>> key)
        where T : class
        where U : class =>
        entity.HasOne<U>()
            .WithOne()
            .HasForeignKey(key)
            .OnDelete(DeleteBehavior.Restrict);
}