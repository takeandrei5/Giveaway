using AutoFixture;
using FluentAssertions;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Models;
using Giveaway.WebApi.Endpoints.Listings;
using Helpers;
using System;
using System.Collections.Generic;
using Xunit;

namespace WebApi.UnitTests.Endpoints.Listings.ReadAll;

public sealed class Map_2 : Base
{
    [Fact(DisplayName = "AutoMapper maps IEnumerable<ListingDtoModel> to ReadAllResponse successfully.")]
    public void AutoMapper_Maps_IEnumerable_ListingDtoModel_To_ReadAllResponse_Successfully()
    {
        // Arrange
        var listingId = _fixture.Create<Guid>();
        var listingTitle = _fixture.Create<string>();
        var listingDescription = _fixture.Create<string>();
        var listingMainImageUrl = _fixture.CreateUrl();

        var source = new List<ListingDtoModel>
        {
            new() {
                Id = listingId,
                Title = listingTitle,
                Description = listingDescription,
                MainImageUrl = listingMainImageUrl
            }
        };

        var destination = new ReadAllResponse()
        {
            Listings = new List<ReadAllResponse.Listing>
            {
                new() {
                    Id = listingId,
                    Title = listingTitle,
                    Description = listingDescription,
                    MainImageUrl = listingMainImageUrl
                }
            }
        };

        // Act
        var result = Mapper.Map<ReadAllResponse>(source);

        // Assert
        result.Should()
            .BeEquivalentTo(destination);
    }
}
