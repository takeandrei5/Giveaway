using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using Giveaway.Application.UnitTests.UseCases.CreateListingTests;
using Giveaway.Domain.Listings;
using SoftwareCraft.Functional;
using Giveaway.Application.UseCases.CreateListing;
using AutoFixture;
using Giveaway.Extensions;
using Giveaway.Domain.Categories;

namespace Giveaway.Application.UnitTests.UseCases.CreateListingTests;

public sealed class ExecuteAsync_1 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow if creating a listing returns error result.")]
    public async Task Check_ExecuteAsync_Execution_Flow_If_Creating_A_Listing_Returns_Error_Result()
    {
        // Arrange
        Initialize();

        _listingRepositoryMock.Setup(listingRepository => listingRepository.CreateAsync(It.IsAny<Listing>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(string.Empty.AsError());

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
        Times.Once);
    }
}
