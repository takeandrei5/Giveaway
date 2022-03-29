using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Application.Interfaces;
using Giveaway.Application.UseCases.CreateListing;
using Giveaway.Domain.Interfaces;

namespace Giveaway.Application.UseCases.CreateListing;

public sealed class Command
{
    private readonly ILoggedUser _currentUserEmailProvider;
    private readonly IListingRepository _listingRepository;
    private readonly IUserRepository _userRepository;

    public Command(ILoggedUser currentUserEmailProvider, IListingRepository listingRepository, IUserRepository userRepository)
    {
        _currentUserEmailProvider = currentUserEmailProvider;
        _listingRepository = listingRepository;
        _userRepository = userRepository;
    }

    public async Task<Result<string>> ExecuteAsync(CommandFeed feed, CancellationToken cancellationToken)
    {
        var user = await _userRepository.FindUserByEmailAsync(_currentUserEmailProvider.GetEmailFromClaims(), cancellationToken);

        var newListing = user.CreateListing(feed.Title, feed.Description, feed.Images, feed.Category);

        return await _listingRepository.CreateAsync(newListing, cancellationToken);
    }
}
