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
using Giveaway.Domain.Users;
using Giveaway.Application.UseCases.ReadListingById.Models;

namespace Giveaway.Application.UnitTests.UseCases.ReadListingByIdTests;

public sealed class ExecuteAsync_2 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow.")]
    public async Task Check_ExecuteAsync_Execution_Flow()
    {
        // Arrange
        var listingId = new ListingId(_fixture.Create<Guid>());
        var listing = new Listing(listingId, new ListingTitle(_fixture.Create<string>()), new ListingDescription(_fixture.Create<string>()), new UserId(_fixture.Create<Guid>()));

        _listingRepositoryMock.Setup(listingRepository => listingRepository.FindListingByIdAsync(It.IsAny<ListingId>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(listing.AsSuccess<Listing, string>());

        _listingReaderMock.Setup(listingReader => listingReader.ReadListingById(It.IsAny<ListingId>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(_fixture.Create<ListingReadModel>());

        // Act
        await _sut.ExecuteAsync(listingId, CancellationToken.None);

        // Assert
        _listingRepositoryMock.Verify(listingRepository => listingRepository.FindListingByIdAsync(
                It.Is<ListingId>(listing => listing.Value == listingId.Value), CancellationToken.None),
            Times.Once);

        _listingReaderMock.Verify(listingReader => listingReader.ReadListingById(It.Is<ListingId>(listing => listing.Value == listingId.Value), CancellationToken.None),
            Times.Once);
    }
}
