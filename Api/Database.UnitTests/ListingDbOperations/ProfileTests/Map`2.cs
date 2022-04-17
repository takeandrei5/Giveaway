using AutoFixture;
using FluentAssertions;
using Giveaway.Database.Persistence.Entities;
using Helpers;
using System;
using System.Linq;
using Xunit;

using ReadListingById = Giveaway.Application.UseCases.Listings.ReadListingById.Models.ListingDtoModel;

namespace Giveaway.Database.UnitTests.ListingDbOperations.ProfileTests;

public sealed class Map_2 : Base
{
    [Fact(DisplayName = "AutoMapper maps ListingEntity to ReadListingById successfully.")]
    public void AutoMapper_Maps_ListingEntity_To_ReadListingById_Successfully()
    {
        // Arrange
        var listingId = _fixture.Create<Guid>();
        var listingOwnerId = _fixture.Create<Guid>();
        var listingTitle = _fixture.Create<string>();
        var listingDescription = _fixture.Create<string>();
        const int listingCategoryId = 1;
        var listingImages = _fixture.CreateManyImageEntity(listingId, 5);
        var listingCreationDate = _fixture.Create<DateTime>();
        var listingLastModificationDate = _fixture.Create<DateTime>();

        var ownerEmail = _fixture.CreateEmail();
        var ownerImage = _fixture.CreateUrl();
        var ownerName = _fixture.Create<string>();

        var source = new ListingEntity()
        {
            Id = listingId,
            OwnerId = listingOwnerId,
            Title = listingTitle,
            Description = listingDescription,
            CategoryId = listingCategoryId,
            Images = listingImages.ToList(),
            CreatedAt = listingCreationDate,
            LastModifiedAt = listingLastModificationDate,
            Owner = new UserEntity
            {
                Email = ownerEmail,
                Name = ownerName,
                Image = ownerImage
            }
        };

        var destination = new ReadListingById()
        {
            Id = listingId,
            Title = listingTitle,
            Description = listingDescription,
            Category = listingCategoryId,
            Images = listingImages.Select(image => image.Url),
            CreatedAt = listingCreationDate,
            OwnerEmail = ownerEmail,
            OwnerName = ownerName,
            OwnerImage = ownerImage
        };

        // Act
        var result = Mapper.Map<ReadListingById>(source);

        // Assert
        result.Should()
            .BeEquivalentTo(destination);
    }
}
