using AutoFixture;
using FluentAssertions;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Models;
using Giveaway.WebApi.Endpoints.Listings;
using Helpers;
using System;
using Xunit;

namespace WebApi.UnitTests.Endpoints.Listings.ReadAll;

public sealed class Map_1 : Base
{
    [Fact(DisplayName = "AutoMapper maps ListingDtoModel to ReadAllResponse.Listing successfully.")]
    public void AutoMapper_Maps_ListingDtoModel_To_ReadAllResponse_Listing_Successfully()
    {
        // Arrange
        var listingId = _fixture.Create<Guid>();
        var listingTitle = _fixture.Create<string>();
        var listingDescription = _fixture.Create<string>();
        var listingMainImageUrl = _fixture.CreateUrl();

        var source = new ListingDtoModel()
        {
            Id = listingId,
            Title = listingTitle,
            Description = listingDescription,
            MainImageUrl = listingMainImageUrl
        };

        var destination = new ReadAllResponse.Listing()
        {
            Id = listingId,
            Title = listingTitle,
            Description = listingDescription,
            MainImageUrl = listingMainImageUrl
        };

        // Act
        var result = Mapper.Map<ReadAllResponse.Listing>(source);

        // Assert
        result.Should()
            .BeEquivalentTo(destination);
    }
}
