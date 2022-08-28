namespace Giveaway.Commons.Extra.Pagination;

public static class IEnumerableExtensions
{
    public static PaginatedResult<T> ToPaginatedList<T>(this IEnumerable<T> source,
        ListPagedQueryBase query, Func<IEnumerable<T>, IEnumerable<T>> applyOrdering) where T : class
    {
        var count = source.Count();

        var items = applyOrdering(source)
            .Skip((query.PageNumber - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToList();

        return PaginatedResult<T>.Success(items, count, query.PageNumber, query.PageSize);
    }
}
