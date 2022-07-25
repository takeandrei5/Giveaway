using Microsoft.EntityFrameworkCore;

namespace Giveaway.Commons.Extra.Pagination;

public static class IQueryableExtensions
{
    public static async Task<PaginatedResult<T>> ToPaginatedListAsync<T>(this IQueryable<T> source,
        ListPagedQueryBase query, Func<IQueryable<T>, IQueryable<T>> ApplyOrdering,
        CancellationToken cancellationToken = default)
        where T : class
    {
        var count = await source.CountAsync(cancellationToken);

        var items = await ApplyOrdering(source)
           .Skip((query.PageNumber - 1) * query.PageSize)
           .Take(query.PageSize)
           .ToListAsync(cancellationToken);

        return PaginatedResult<T>.Success(items, count, query.PageNumber, query.PageSize);
    }
}