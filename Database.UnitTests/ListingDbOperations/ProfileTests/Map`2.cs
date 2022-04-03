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

using ReadListingById = Giveaway.Application.UseCases.Listings.ReadListingById.Models.ListingReadModel;
using Giveaway.Application.UseCases.Listings.ReadListingById.Models;

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
        var listingCreationDate = _fixture.Create<DateTime>();
        var listingLastModificationDate = _fixture.Create<DateTime>();

        var source = new ListingEntity()
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
        var result = Mapper.MergeInto<ReadListingById>(source, destination);

        // Assert
        result.Should()
            .BeEquivalentTo(destination);
    }
}
