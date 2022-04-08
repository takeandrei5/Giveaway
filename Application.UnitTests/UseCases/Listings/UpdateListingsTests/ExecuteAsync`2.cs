using AutoFixture;
using Giveaway.Application.UseCases.Listings.UpdateListing;
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

namespace Giveaway.Application.UnitTests.UseCases.Listings.UpdateListingsTests;

public sealed class ExecuteAsync_2 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow.")]
    public async Task Check_ExecuteAsync_Execution_Flow()
    {
        // Arrange
        var listingId = new ListingId(_fixture.Create<Guid>());

        var commandFeed = new CommandFeed
        {
            Id = listingId,
            Title = new(_fixture.Create<string>()),
            Description = new(_fixture.Create<string>()),
            Images = new List<ListingImage>
            {
                new(_fixture.CreateUrl())
            },
            Category = Category.From(1)
        };

        var listing = new Listing(listingId,
           commandFeed.Title,
           commandFeed.Description,
           new(_fixture.Create<Guid>()),
           commandFeed.Images,
           commandFeed.Category);

        _listingRepositoryMock.Setup(listingRepository =>
                listingRepository.FindListingByIdAsync(listingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(listing.AsSuccess<Listing, NotFoundError>());

        // Act
        await _sut.ExecuteAsync(commandFeed, CancellationToken.None);

        // Assert
        _listingRepositoryMock.Verify(listingRepository =>
                listingRepository.FindListingByIdAsync(listingId, CancellationToken.None),
            Times.Once);

        _listingRepositoryMock.Verify(listingRepository =>
            listingRepository.UpdateAsync(It.Is<Listing>(l => l == listing), CancellationToken.None),
        Times.Once);
    }
}
