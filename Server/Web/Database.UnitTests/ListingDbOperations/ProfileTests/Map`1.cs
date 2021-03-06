using System;
using System.Collections.Generic;
using AutoFixture;
using FluentAssertions;
using Giveaway.Web.Database.Persistence.Entities;
using Helpers;
using Xunit;
using ReadAllListingsModel = Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Models.ListingDtoModel;

namespace Giveaway.Web.Database.UnitTests.ListingDbOperations.ProfileTests;

public sealed class Map_1 : Base
{
    [Fact(DisplayName = "AutoMapper maps ListingEntity to ReadAllListingsModel successfully.")]
    public void AutoMapper_Maps_ListingEntity_To_ReadAllListingsModel_Successfully()
    {
        // Arrange
        var listingId = _fixture.Create<Guid>();
        var listingOwnerId = _fixture.Create<Guid>();
        var listingTitle = _fixture.Create<string>();
        const int listingCategoryId = 1;
        var listingDescription = _fixture.Create<string>();
        var listingCreationDate = _fixture.Create<DateTime>();
        var listingLastModificationDate = _fixture.Create<DateTime>();
        var listingImageUrl = _fixture.CreateUrl();
        var listingImageUrl2 = _fixture.CreateUrl();

        var source = new ListingEntity()
        {
            Id = listingId,
            OwnerId = listingOwnerId,
            Title = listingTitle,
            Description = listingDescription,
            CategoryId = listingCategoryId,
            Images = new List<ImageEntity>()
            {
                new()
                {
                    Index = 1,
                    Url = listingImageUrl
                },
                new()
                {
                    Index = 2,
                    Url = listingImageUrl2
                }
            },
            CreatedAt = listingCreationDate,
            LastModifiedAt = listingLastModificationDate,
        };

        var destination = new ReadAllListingsModel()
        {
            Id = listingId,
            Title = listingTitle,
            Image = listingImageUrl,
            CreatedAt = listingCreationDate,
        };

        // Act
        var mapperResult = Mapper.Map<ReadAllListingsModel>(source);

        // Assert
        mapperResult.Should()
            .BeEquivalentTo(destination);
    }
}
