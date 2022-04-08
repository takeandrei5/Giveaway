﻿using AutoFixture;
using FluentAssertions;
using Giveaway.Application.UseCases.Listings.ReadListingById.Models;
using Giveaway.WebApi.Endpoints.Listings;
using Helpers;
using System;
using System.Linq;
using Xunit;

namespace WebApi.UnitTests.Endpoints.Listings.ReadOne;

public sealed class Map_1 : Base
{
    [Fact(DisplayName = "AutoMapper maps ListingDtoModel to ReadOneResponse successfully.")]
    public void AutoMapper_Maps_ListingDtoModel_To_ReadOneResponse_Successfully()
    {
        // Arrange
        var listingId = _fixture.Create<Guid>();
        var listingTitle = _fixture.Create<string>();
        var listingDescription = _fixture.Create<string>();

        const int category = 1;
        var images = Enumerable.Repeat(_fixture.CreateUrl(), 2).ToList();

        var source = new ListingDtoModel()
        {
            Id = listingId,
            Title = listingTitle,
            Description = listingDescription,
            Category = category,
            Images = images
        };

        var destination = new ReadOneResponse()
        {
            Id = listingId,
            Title = listingTitle,
            Description = listingDescription,
            Category = category,
            Images = images
        };

        // Act
        var result = Mapper.Map<ReadOneResponse>(source);

        // Assert
        result.Should()
                .BeEquivalentTo(destination);
    }
}
