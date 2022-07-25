using Giveaway.Commons.Extra.Pagination;
using Giveaway.Web.Application.Interfaces;
using Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Models;
using Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Pagination;

namespace Giveaway.Web.Application.UseCases.Listings.ReadAllListings;

public sealed class Command
{
    private readonly IListingReader _reader;

    public Command(IListingReader reader) => _reader = reader;

    public async Task<PaginatedResult<ListingDtoModel>> ExecuteAsync(ListPagedQuery listPagedQuery,
        CancellationToken cancellationToken) => await _reader.ReadAllListingsAsync(listPagedQuery, cancellationToken);
}
