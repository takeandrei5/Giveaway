﻿using AutoFixture;
using Giveaway.Domain.Errors;
using Giveaway.Domain.Listings;
using Moq;
using SoftwareCraft.Functional;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Giveaway.Application.UnitTests.UseCases.Listings.DeleteListingsTests;

public sealed class ExecuteAsync_1 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow if listing does not exist.")]
    public async Task Check_ExecuteAsync_Execution_Flow_If_Listing_Does_Not_Exist()
    {
        // Arrange
        var listingId = new ListingId(_fixture.Create<Guid>());

        _loggedUserMock.Setup(loggedUser => loggedUser.GetEmailFromClaims())
            .Returns(Email);

        _listingRepositoryMock.Setup(listingRepository =>
                listingRepository.FindListingByIdAsync(listingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(
                new NotFoundError($"The listing with id {listingId.Value} could not be found.")
                    .AsError<Listing, NotFoundError>());

        // Act
        await _sut.ExecuteAsync(listingId, CancellationToken.None);

        // Assert
        _listingRepositoryMock.Verify(listingRepository =>
                listingRepository.FindListingByIdAsync(listingId, CancellationToken.None),
            Times.Once);

        _listingRepositoryMock.Verify(listingRepository =>
            listingRepository.DeleteAsync(It.Is<Listing>(listing => listing.Id == listingId),
                CancellationToken.None),
        Times.Never);
    }
}
