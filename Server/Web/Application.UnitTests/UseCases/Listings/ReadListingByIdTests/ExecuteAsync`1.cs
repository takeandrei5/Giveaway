using System;
using System.Threading;
using System.Threading.Tasks;
using AutoFixture;
using Giveaway.Commons.Errors;
using Giveaway.Web.Domain.Listings;
using Moq;
using SoftwareCraft.Functional;
using Xunit;

namespace Giveaway.Web.Application.UnitTests.UseCases.Listings.ReadListingByIdTests;

public sealed class ExecuteAsync_1 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow if no listing can be found for the given listing id.")]
    public async Task Check_ExecuteAsync_Execution_Flow_If_No_Listing_Can_Be_Found_For_The_Given_Listing_Id()
    {
        // Arrange
        var listingId = new ListingId(_fixture.Create<Guid>());

        _listingRepositoryMock.Setup(listingRepository => listingRepository.FindListingByIdAsync(It.IsAny<ListingId>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(
                new NotFoundError($"The listing with id {listingId.Value} could not be found.")
                    .AsError<Listing, NotFoundError>());

        // Act
        await _sut.ExecuteAsync(listingId, CancellationToken.None);

        // Assert
        _listingRepositoryMock.Verify(listingRepository =>
            listingRepository.FindListingByIdAsync(It.Is<ListingId>(listing => listing.Value == listingId.Value),
                CancellationToken.None),
            Times.Once);
    }
}
