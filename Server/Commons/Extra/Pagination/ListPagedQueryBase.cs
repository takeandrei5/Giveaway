namespace Giveaway.Commons.Extra.Pagination;

public abstract record ListPagedQueryBase
{
    public int PageNumber { get; init; }

    public int PageSize { get; init; } = 10;

    public string OrderBy { get; init; } = null!;
}