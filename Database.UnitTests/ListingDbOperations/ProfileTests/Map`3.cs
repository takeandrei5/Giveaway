using AutoFixture;
using FluentAssertions;
using Giveaway.Database.Persistence.Entities;
using Helpers;
using System;
using Xunit;
using ReadListingById = Giveaway.Application.UseCases.Listings.ReadListingById.Models.ListingDtoModel;

namespace Giveaway.Database.UnitTests.ListingDbOperations.ProfileTests;

public sealed class Map_3 : Base
{
    [Fact(DisplayName = "AutoMapper maps ImageEntity to ReadListingById.Image successfully.")]
    public void AutoMapper_Maps_ImageEntity_To_ReadListingById_Image_Successfully()
    {
        // Arrange
        var imageId = _fixture.Create<Guid>();
        var listingId = _fixture.Create<Guid>();
        var imageUrl = _fixture.CreateUrl();

        var source = new ImageEntity()
        {
            Id = imageId,
            ListingId = listingId,
            Url = imageUrl
        };

        var destination = new ReadListingById.Image()
        {
            Url = imageUrl
        };

        // Act
        var result = Mapper.Map<ReadListingById.Image>(source);

        // Assert
        result.Should()
            .BeEquivalentTo(destination);
    }
}
