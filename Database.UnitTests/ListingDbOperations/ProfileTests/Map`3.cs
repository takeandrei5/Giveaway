using AutoFixture;
using FluentAssertions;
using Giveaway.Database.Persistence.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

using ReadListingById = Giveaway.Application.UseCases.ReadListingById.Models.ListingReadModel;

namespace Giveaway.Database.UnitTests.ListingDbOperations.ProfileTests;

public sealed class Map_3 : Base
{
    [Fact(DisplayName = "AutoMapper maps ItemEntity to ReadListingById.Item successfully.")]
    public void AutoMapper_Maps_ItemEntity_To_ReadListingById_Item_Successfully()
    {
        // Arrange
        var itemId = _fixture.Create<Guid>();
        var listingId = _fixture.Create<Guid>();
        var itemTitle = _fixture.Create<string>();
        var itemDescription = _fixture.Create<string>();
        var itemCreationDate = _fixture.Create<DateTime>();
        var itemLastModificationDate = _fixture.Create<DateTime>();

        var source = new ItemEntity()
        {
            Id = itemId,
            ListingId = listingId,
            Title = itemTitle,
            Description = itemDescription,
            CreatedAt = itemCreationDate,
            LastModifiedAt = itemLastModificationDate
        };

        var destination = new ReadListingById.Item()
        {
            Id = itemId,
            Title = itemTitle,
            Description = itemDescription
        };

        // Act
        var mapperResult = Mapper.Map<ReadListingById.Item>(source);

        // Assert
        mapperResult.Should()
            .BeEquivalentTo(destination);
    }
}
