using Giveaway.Commons.Errors;
using Giveaway.Commons.Interfaces;
using Giveaway.Domain.Interfaces;
using Giveaway.Domain.Listings;
using SoftwareCraft.Functional;

namespace Giveaway.Web.Application.UseCases.Listings.CreateListing;

public sealed class Command
{
    private readonly ILoggedUser _currentUserEmailProvider;
    private readonly IListingRepository _listingRepository;
    private readonly IUserRepository _userRepository;

    public Command(ILoggedUser currentUserEmailProvider, IListingRepository listingRepository,
        IUserRepository userRepository)
    {
        _currentUserEmailProvider = currentUserEmailProvider;
        _listingRepository = listingRepository;
        _userRepository = userRepository;
    }

    public async Task<Result<ListingId, ForbiddenError>> ExecuteAsync(CommandFeed feed,
        CancellationToken cancellationToken)
    {
        var userResult =
            await _userRepository.FindUserByEmailAsync(_currentUserEmailProvider.GetEmailFromClaims(),
                cancellationToken);

        return await userResult.SelectManyAsync(async user =>
        {
            var newListing = user.CreateListing(feed.Title, feed.Description, feed.Images, feed.Category);

            await _listingRepository.CreateAsync(newListing, cancellationToken);

            return newListing.Id.AsSuccess<ListingId, ForbiddenError>();
        });
    }
}
