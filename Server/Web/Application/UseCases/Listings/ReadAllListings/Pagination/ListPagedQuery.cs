using Giveaway.Commons.Extra.Pagination;

namespace Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Pagination;

public sealed record ListPagedQuery : ListPagedQueryBase
{
    public int? FilterByCategory { get; init; }
}
