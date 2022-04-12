namespace Giveaway.Commons.Extra.Pagination;

public sealed class PaginatedResult<T>
{
    private PaginatedResult(IEnumerable<T> result, int count = 0, int page = 1, int pageSize = 10)
    {
        Result = result;
        CurrentPage = page;
        PageSize = pageSize;
        TotalPages = count > 0 ? (int)Math.Ceiling(count / (double)pageSize) : 1;
        TotalCount = count;
    }

    public IEnumerable<T> Result { get; init; }

    public int CurrentPage { get; init; }

    public int TotalPages { get; init; }

    public int TotalCount { get; init; }

    public int PageSize { get; init; }

    public bool HasPreviousPage => CurrentPage > 1;

    public bool HasNextPage => CurrentPage < TotalPages;

    public static PaginatedResult<T> Success(IEnumerable<T> result, int count, int page, int pageSize) =>
        new(result, count, page, pageSize);

    public static PaginatedResult<T> Empty() =>
        new(Enumerable.Empty<T>());
}