using Giveaway.Commons.Errors;
using Giveaway.Web.Domain.Listings;
using SoftwareCraft.Functional;

namespace Giveaway.Web.Domain.Interfaces;

public interface IListingRepository
{
    Task CreateAsync(Listing listing, CancellationToken cancellationToken);

    Task DeleteAsync(Listing listing, CancellationToken cancellationToken);

    Task<Result<Listing, NotFoundError>> FindListingByIdAsync(ListingId listingId, CancellationToken cancellationToken);

    Task UpdateAsync(Listing listing, CancellationToken cancellationToken);
}
