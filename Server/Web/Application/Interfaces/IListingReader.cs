using Giveaway.Commons.Extra.Pagination;
using Giveaway.Domain.Listings;
using Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Pagination;
using ReadAllListingsModel = Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Models.ListingDtoModel;
using ReadListingByIdModel = Giveaway.Web.Application.UseCases.Listings.ReadListingById.Models.ListingDtoModel;

namespace Giveaway.Web.Application.Interfaces;

public interface IListingReader
{
    Task<PaginatedResult<ReadAllListingsModel>> ReadAllListingsAsync(ListPagedQuery listPagedQuery,
        CancellationToken cancellationToken);

    Task<ReadListingByIdModel> ReadListingByIdAsync(ListingId id, CancellationToken cancellationToken);
}
