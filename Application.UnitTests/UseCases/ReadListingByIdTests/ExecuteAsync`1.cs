using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using Giveaway.Domain.Listings;
using SoftwareCraft.Functional;
using AutoFixture;

namespace Giveaway.Application.UnitTests.UseCases.ReadListingByIdTests;

public sealed class ExecuteAsync_1 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow if no listing can be found for the given listing id.")]
    public async Task Check_ExecuteAsync_Execution_Flow_If_No_Listing_Can_Be_Found_For_The_Given_Listing_Id()
    {
        // Arrange
        var listingId = new ListingId(_fixture.Create<Guid>());

        _listingRepositoryMock.Setup(listingRepository => listingRepository.FindListingByIdAsync(It.IsAny<ListingId>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync($"The listing with id {listingId.Value} could not be found.".AsError<Listing, string>());

        // Act
        await _sut.ExecuteAsync(listingId, CancellationToken.None);

        // Assert
        _listingRepositoryMock.Verify(listingRepository =>
            listingRepository.FindListingByIdAsync(It.Is<ListingId>(listing => listing.Value == listingId.Value),
                CancellationToken.None),
            Times.Once);
    }
}
