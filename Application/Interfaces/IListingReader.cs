using Giveaway.Domain.Listings;

using ReadAllListingsModel = Giveaway.Application.UseCases.Listings.ReadAllListings.Models.ListingDtoModel;
using ReadListingByIdModel = Giveaway.Application.UseCases.Listings.ReadListingById.Models.ListingDtoModel;

namespace Giveaway.Application.Interfaces;
public interface IListingReader
{
    Task<IEnumerable<ReadAllListingsModel>> ReadAllListingsAsync(CancellationToken cancellationToken);

    Task<ReadListingByIdModel> ReadListingByIdAsync(ListingId id, CancellationToken cancellationToken);
}
