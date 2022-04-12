using Giveaway.Application.UseCases.Listings.ReadAllListings.Pagination;
using Giveaway.Commons.Extra.Pagination;
using Giveaway.Domain.Listings;

using ReadAllListingsModel = Giveaway.Application.UseCases.Listings.ReadAllListings.Models.ListingDtoModel;
using ReadListingByIdModel = Giveaway.Application.UseCases.Listings.ReadListingById.Models.ListingDtoModel;

namespace Giveaway.Application.Interfaces;

public interface IListingReader
{
    Task<PaginatedResult<ReadAllListingsModel>> ReadAllListingsAsync(ListPagedQuery listPagedQuery,
        CancellationToken cancellationToken);

    Task<ReadListingByIdModel> ReadListingByIdAsync(ListingId id, CancellationToken cancellationToken);
}
