using AutoFixture;
using FluentAssertions;
using Giveaway.Database.Persistence.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

using ReadAllListingsModel = Giveaway.Application.UseCases.Listings.ReadAllListings.Models.ListingDtoModel;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Models;
using Giveaway.Extensions;

namespace Giveaway.Database.UnitTests.ListingDbOperations.ProfileTests;

public sealed class Map_1 : Base
{
    [Fact(DisplayName = "AutoMapper maps ListingEntity to ReadAllListingsModel successfully.")]
    public void AutoMapper_Maps_ListingEntity_To_ReadAllListingsModel_Successfully()
    {
        // Arrange
        var listingId = _fixture.Create<Guid>();
        var listingOwnerId = _fixture.Create<Guid>();
        var listingTitle = _fixture.Create<string>();
        var listingCategoryId = 1;
        var listingDescription = _fixture.Create<string>();
        var listingCreationDate = _fixture.Create<DateTime>();
        var listingLastModificationDate = _fixture.Create<DateTime>();
        var listingImageUrl = _fixture.CreateUrl();

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
                    Url = listingImageUrl
                }
            },
            CreatedAt = listingCreationDate,
            LastModifiedAt = listingLastModificationDate,
        };

        var destination = new ReadAllListingsModel()
        {
            Id = listingId,
            Title = listingTitle,
            Description = listingDescription,
            MainImageUrl = listingImageUrl
        };

        // Act
        var mapperResult = Mapper.Map<ReadAllListingsModel>(source);

        // Assert
        mapperResult.Should()
            .BeEquivalentTo(destination);
    }
}
