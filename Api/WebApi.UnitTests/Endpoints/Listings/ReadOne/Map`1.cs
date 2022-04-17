using AutoFixture;
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
        var listingCreationDate = _fixture.Create<DateTime>();
        const int category = 1;
        var images = Enumerable.Repeat(_fixture.CreateUrl(), 2).ToList();

        var ownerEmail = _fixture.CreateEmail();
        var ownerImage = _fixture.CreateUrl();
        var ownerName = _fixture.Create<string>();

        var source = new ListingDtoModel()
        {
            Id = listingId,
            Title = listingTitle,
            Description = listingDescription,
            Category = category,
            Images = images,
            CreatedAt = listingCreationDate,
            OwnerEmail = ownerEmail,
            OwnerName = ownerName,
            OwnerImage = ownerImage
        };

        var destination = new ReadOneResponse()
        {
            ListingInfo = new ReadOneResponse.ListingInformation
            {
                Id = listingId,
                Title = listingTitle,
                Description = listingDescription,
                Category = category,
                Images = images,
                CreatedAt = listingCreationDate
            },
            OwnerInfo = new ReadOneResponse.OwnerInformation
            {
                Email = ownerEmail,
                Name = ownerName,
                Image = ownerImage
            }
        };

        // Act
        var result = Mapper.Map<ReadOneResponse>(source);

        // Assert
        result.Should()
                .BeEquivalentTo(destination);
    }
}
