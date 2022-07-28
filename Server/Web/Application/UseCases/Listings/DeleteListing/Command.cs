using Giveaway.Commons.Errors;
using Giveaway.Web.Domain.Interfaces;
using Giveaway.Web.Domain.Listings;
using SoftwareCraft.Functional;

namespace Giveaway.Web.Application.UseCases.Listings.DeleteListing;

public sealed class Command
{
    private readonly IListingRepository _listingRepository;

    public Command(IListingRepository listingRepository) => _listingRepository = listingRepository;

    public async Task<Result<NotFoundError>> ExecuteAsync(ListingId listingId, CancellationToken cancellationToken)
    {
        var listingResult = await _listingRepository.FindListingByIdAsync(listingId, cancellationToken);

        return await listingResult.SelectSwitchManyAsync(
            async listing =>
            {
                await _listingRepository.DeleteAsync(listing, cancellationToken);

                return new Success<NotFoundError>();
            });
    }
}
