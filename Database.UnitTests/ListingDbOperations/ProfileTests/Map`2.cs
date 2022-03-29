using AutoFixture;
using FluentAssertions;
using Giveaway.Database.Persistence.Entities;
using Giveaway.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

using ReadListingById = Giveaway.Application.UseCases.ReadListingById.Models.ListingReadModel;

namespace Giveaway.Database.UnitTests.ListingDbOperations.ProfileTests;

public sealed class Map_2 : Base
{
    [Fact(DisplayName = "AutoMapper maps ListingEntity and IEnumerable<ItemEntity> to ReadListingById successfully.")]
    public void AutoMapper_Maps_ListingEntity_And_IEnumerable_ItemEntity_To_ReadListingById_Successfully()
    {
        // Arrange
        var listingId = _fixture.Create<Guid>();
        var listingOwnerId = _fixture.Create<Guid>();
        var listingTitle = _fixture.Create<string>();
        var listingDescription = _fixture.Create<string>();
        var listingCreationDate = _fixture.Create<DateTime>();
        var listingLastModificationDate = _fixture.Create<DateTime>();

        var listingSource = new ListingEntity()
        {
            Id = listingId,
            OwnerId = listingOwnerId,
            Title = listingTitle,
            Description = listingDescription,
            CreatedAt = listingCreationDate,
            LastModifiedAt = listingLastModificationDate
        };

        var destination = new ReadListingById()
        {
            Id = listingId,
            Title = listingTitle,
            Description = listingDescription,
        };

        // Act
        var mapperResult = Mapper.MergeInto<ReadListingById>(listingSource, itemsSource.AsEnumerable());

        // Assert
        mapperResult.Should()
            .BeEquivalentTo(destination);
    }
}
