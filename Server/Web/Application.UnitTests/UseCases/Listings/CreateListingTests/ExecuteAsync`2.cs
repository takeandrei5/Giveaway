using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Giveaway.Commons.Errors;
using Giveaway.Web.Application.UseCases.Listings.CreateListing;
using Giveaway.Web.Domain.Categories;
using Giveaway.Web.Domain.Listings;
using Giveaway.Web.Domain.Users;
using Helpers;
using Moq;
using SoftwareCraft.Functional;
using Xunit;

namespace Giveaway.Web.Application.UnitTests.UseCases.Listings.CreateListingTests;

public sealed class ExecuteAsync_2 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow.")]
    public async Task Check_ExecuteAsync_Execution_Flow()
    {
        // Arrange
        _loggedUserMock.Setup(loggedUser => loggedUser.GetEmailFromClaims())
            .Returns(Email);

        _userRepositoryMock.Setup(userRepository => userRepository.FindUserByEmailAsync(
                It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(_fixture.CreateUser().AsSuccess<User, ForbiddenError>());

        _listingRepositoryMock.Setup(listingRepository => listingRepository.CreateAsync(It.IsAny<Listing>(),
                It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        var commandFeed = new CommandFeed
        {
            Title = new(_fixture.CreateTextWithMaxLength(30)),
            Description = new(_fixture.CreateTextWithMaxLength(30)),
            Images = new List<ListingImage>()
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
        Times.Once);
    }
}
