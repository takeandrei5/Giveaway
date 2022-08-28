namespace Giveaway.Commons.Extra.Pagination;

public sealed class PaginatedResult<T>
{
    private PaginatedResult(IEnumerable<T> result, int totalCount = 0, int page = 1, int pageSize = 10)
    {
        Result = result;
        CurrentPage = page;
        PageSize = pageSize;
        TotalPages = totalCount > 0 ? (int)Math.Ceiling(totalCount / (double)pageSize) : 1;
        TotalCount = totalCount;
    }

    public IEnumerable<T> Result { get; init; }

    public int CurrentPage { get; init; }

    public int TotalPages { get; init; }

    public int TotalCount { get; init; }

    public int PageSize { get; init; }

    public bool HasPreviousPage => CurrentPage > 1;

    public bool HasNextPage => CurrentPage < TotalPages;

    public static PaginatedResult<T> Success(IEnumerable<T> result, int totalCount, int page, int pageSize) =>
        new(result, totalCount, page, pageSize);

    public static PaginatedResult<T> Empty() =>
        new(Enumerable.Empty<T>());
}
