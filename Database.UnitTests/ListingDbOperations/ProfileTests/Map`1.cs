using AutoFixture;
using FluentAssertions;
using Giveaway.Database.Persistence.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

using ReadAllListingsModel = Giveaway.Application.UseCases.ReadAllListings.Models.ListingReadModel;

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

        var destination = new ReadAllListingsModel()
        {
            Id = listingId,
            Title = listingTitle,
            Description = listingDescription
        };

        // Act
        var mapperResult = Mapper.Map<ReadAllListingsModel>(source);

        // Assert
        mapperResult.Should()
            .BeEquivalentTo(destination);
    }
}
