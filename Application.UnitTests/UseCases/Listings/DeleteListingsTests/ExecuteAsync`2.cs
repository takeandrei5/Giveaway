using AutoFixture;
using Giveaway.Domain.Categories;
using Giveaway.Domain.Errors;
using Giveaway.Domain.Listings;
using Giveaway.Domain.Users;
using Moq;
using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Giveaway.Application.UnitTests.UseCases.Listings.DeleteListingsTests;

public sealed class ExecuteAsync_2 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow.")]
    public async Task Check_ExecuteAsync_Execution_Flow()
    {
        // Arrange
        var listingId = new ListingId(_fixture.Create<Guid>());
        var listing = new Listing(listingId,
            It.IsAny<ListingTitle>(),
            It.IsAny<ListingDescription>(),
            It.IsAny<UserId>(),
            new List<ListingImage> { It.IsAny<ListingImage>() },
            It.IsAny<Category>());

        _loggedUserMock.Setup(loggedUser => loggedUser.GetEmailFromClaims())
            .Returns(Email);

        _listingRepositoryMock.Setup(listingRepository =>
                listingRepository.FindListingByIdAsync(listingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(listing.AsSuccess<Listing, NotFoundError>());

        // Act
        await _sut.ExecuteAsync(listingId, CancellationToken.None);

        // Assert
        _listingRepositoryMock.Verify(listingRepository =>
                listingRepository.FindListingByIdAsync(listingId, CancellationToken.None),
            Times.Once);

        _listingRepositoryMock.Verify(listingRepository =>
            listingRepository.DeleteAsync(It.Is<Listing>(l => l == listing), CancellationToken.None),
        Times.Once);
    }
}
