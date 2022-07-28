using Giveaway.Commons.Extra.Pagination;
using Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Pagination;
using Giveaway.Web.Domain.Listings;
using ReadAllListingsModel = Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Models.ListingDtoModel;
using ReadListingByIdModel = Giveaway.Web.Application.UseCases.Listings.ReadListingById.Models.ListingDtoModel;

namespace Giveaway.Web.Application.Interfaces;

public interface IListingReader
{
    Task<PaginatedResult<ReadAllListingsModel>> ReadAllListingsAsync(ListPagedQuery listPagedQuery,
        CancellationToken cancellationToken);

    Task<ReadListingByIdModel> ReadListingByIdAsync(ListingId id, CancellationToken cancellationToken);
}
