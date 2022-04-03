using Giveaway.Application.UseCases.Listings.CreateListing;
using Giveaway.Domain.Categories;
using Giveaway.Domain.Errors;
using Giveaway.Domain.Listings;
using Giveaway.Domain.Users;
using Giveaway.Extensions;
using Moq;
using SoftwareCraft.Functional;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Giveaway.Application.UnitTests.UseCases.Listings.CreateListingTests;

public sealed class ExecuteAsync_1 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow if current user could not be found.")]
    public async Task Check_ExecuteAsync_Execution_Flow_If_Current_User_Could_Not_Be_Found()
    {
        // Arrange
        _loggedUserMock.Setup(loggedUser => loggedUser.GetEmailFromClaims())
            .Returns(Email);

        _userRepositoryMock.Setup(userRepository => userRepository.FindUserByEmailAsync(
                It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new ForbiddenError($"User onboarding issue for email {Email}").AsError<User, ForbiddenError>());

        var commandFeed = new CommandFeed
        {
            Title = new(_fixture.CreateTextWithMaxLength(30)),
            Description = new(_fixture.CreateTextWithMaxLength(30)),
            Images = new List<ListingImage>
            {
                new(_fixture.CreateUrl())
            },
            Category = Category.From(1)
        };

        // Act
        await _sut.ExecuteAsync(commandFeed, CancellationToken.None);

        // Assert
        _loggedUserMock.Verify(loggedUser => loggedUser.GetEmailFromClaims(), Times.Once);

        _userRepositoryMock.Verify(userRepository => userRepository.FindUserByEmailAsync(It.IsAny<string>(),
                CancellationToken.None),
            Times.Once);

        _listingRepositoryMock.Verify(listingRepository =>
            listingRepository.CreateAsync(It.Is<Listing>(listing => listing.Title == commandFeed.Title && listing.Description == commandFeed.Description),
                CancellationToken.None),
        Times.Never);
    }
}
