using Giveaway.Domain.Errors;
using Giveaway.Domain.Listings;
using SoftwareCraft.Functional;

namespace Giveaway.Domain.Interfaces;

public interface IListingRepository
{
    Task CreateAsync(Listing listing, CancellationToken cancellationToken);

    Task DeleteAsync(Listing listing, CancellationToken cancellationToken);

    Task<Result<Listing, NotFoundError>> FindListingByIdAsync(ListingId listingId, CancellationToken cancellationToken);
}
