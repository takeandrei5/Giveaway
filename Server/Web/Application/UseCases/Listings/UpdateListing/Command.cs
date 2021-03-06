using Giveaway.Commons.Errors;
using Giveaway.Web.Domain.Interfaces;
using Giveaway.Web.Domain.Listings;
using SoftwareCraft.Functional;

namespace Giveaway.Web.Application.UseCases.Listings.UpdateListing;

public sealed class Command
{
    private readonly IListingRepository _listingRepository;

    public Command(IListingRepository listingRepository) => _listingRepository = listingRepository;

    public async Task<Result<NotFoundError>> ExecuteAsync(CommandFeed feed, CancellationToken cancellationToken)
    {
        var listingResult = await _listingRepository.FindListingByIdAsync(feed.Id, cancellationToken);

        return await listingResult.SelectSwitchManyAsync(
            async listing =>
            {
                var newListing = new Listing(listing.Id, feed.Title, feed.Description,
                    listing.OwnerId, feed.Images, feed.Category);

                await _listingRepository.UpdateAsync(newListing, cancellationToken);

                return new Success<NotFoundError>();
            });
    }
}
