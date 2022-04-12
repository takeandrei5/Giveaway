using AutoFixture;
using FluentAssertions;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Models;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Pagination;
using Giveaway.Commons.Extra.Pagination;
using Giveaway.WebApi.Endpoints.Listings;
using Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace WebApi.UnitTests.Endpoints.Listings.ReadAll;

public sealed class Map_2 : Base
{
    [Fact(DisplayName = "AutoMapper maps PaginatedResult<ListingDtoModel> to ReadAllResponse successfully.")]
    public void AutoMapper_Maps_PaginatedResult_ListingDtoModel_To_ReadAllResponse_Successfully()
    {
        // Arrange
        const int pageNumber = 1;
        const int pageSize = 10;
        const string orderBy = "Title";

        var listPagedQuery = new ListPagedQuery
        {
            PageNumber = pageNumber,
            PageSize = pageSize,
            OrderBy = orderBy,
            FilterByCategory = null,
        };

        var listingId = _fixture.Create<Guid>();
        var listingTitle = _fixture.Create<string>();
        var listingDescription = _fixture.Create<string>();
        var listingMainImageUrl = _fixture.CreateUrl();
        var listingCreatedAt = DateTime.UtcNow;

        var listingDtoModels = new List<ListingDtoModel>
        {
            new() {
                Id = listingId,
                Title = listingTitle,
                Description = listingDescription,
                MainImageUrl = listingMainImageUrl,
                CreatedAt = listingCreatedAt,
            }
        };

        var source = listingDtoModels.ToPaginatedList(listPagedQuery, (listPagedQuery) => listPagedQuery);

        var destination = listingDtoModels.Select(l => new ReadAllResponse.Listing
        {
            Id = l.Id,
            Title = l.Title,
            Description = l.Description,
            MainImageUrl = l.MainImageUrl,
            CreatedAt = l.CreatedAt,
        });

        // Act
        var result = Mapper.Map<ReadAllResponse>(source);

        // Assert
        result.Listings.Result.Should()
            .BeEquivalentTo(destination);
    }
}
