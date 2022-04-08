using Giveaway.Application.Interfaces;
using Giveaway.Domain.Errors;
using Giveaway.Domain.Interfaces;
using Giveaway.Domain.Listings;
using SoftwareCraft.Functional;

namespace Giveaway.Application.UseCases.Listings.DeleteListing;

public sealed class Command
{
    private readonly ILoggedUser _currentUserEmailProvider;
    private readonly IListingRepository _listingRepository;

    public Command(ILoggedUser currentUserEmailProvider, IListingRepository listingRepository)
    {
        _currentUserEmailProvider = currentUserEmailProvider;
        _listingRepository = listingRepository;
    }

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
