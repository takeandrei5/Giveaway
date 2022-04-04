using AutoFixture;
using Giveaway.Application.UseCases.Listings.ReadListingById.Models;
using Giveaway.Domain.Categories;
using Giveaway.Domain.Errors;
using Giveaway.Domain.Listings;
using Helpers;
using Moq;
using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Giveaway.Application.UnitTests.UseCases.Listings.ReadListingByIdTests;

public sealed class ExecuteAsync_2 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow.")]
    public async Task Check_ExecuteAsync_Execution_Flow()
    {
        // Arrange
        var listingId = new ListingId(_fixture.Create<Guid>());
        var listing = new Listing(listingId,
            new(_fixture.Create<string>()),
            new(_fixture.Create<string>()),
            new(_fixture.Create<Guid>()),
            new List<ListingImage>()
            {
                new(_fixture.CreateUrl())
            },
            Category.From(1));

        _listingRepositoryMock.Setup(listingRepository => listingRepository.FindListingByIdAsync(It.IsAny<ListingId>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(listing.AsSuccess<Listing, NotFoundError>());

        _listingReaderMock.Setup(listingReader => listingReader.ReadListingByIdAsync(It.IsAny<ListingId>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(_fixture.Create<ListingDtoModel>());

        // Act
        await _sut.ExecuteAsync(listingId, CancellationToken.None);

        // Assert
        _listingRepositoryMock.Verify(listingRepository =>
            listingRepository.FindListingByIdAsync(It.Is<ListingId>(listing => listing.Value == listingId.Value),
                CancellationToken.None),
            Times.Once);

        _listingReaderMock.Verify(listingReader =>
            listingReader.ReadListingByIdAsync(It.Is<ListingId>(listing => listing.Value == listingId.Value),
                CancellationToken.None),
            Times.Once);
    }
}
