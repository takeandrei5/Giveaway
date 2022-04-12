using Giveaway.Application.Interfaces;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Models;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Pagination;
using Giveaway.Commons.Extra.Pagination;

namespace Giveaway.Application.UseCases.Listings.ReadAllListings;
public sealed class Command
{
    private readonly IListingReader _reader;

    public Command(IListingReader reader) => _reader = reader;

    public async Task<PaginatedResult<ListingDtoModel>> ExecuteAsync(ListPagedQuery listPagedQuery,
        CancellationToken cancellationToken) =>
        await _reader.ReadAllListingsAsync(listPagedQuery, cancellationToken);
}
