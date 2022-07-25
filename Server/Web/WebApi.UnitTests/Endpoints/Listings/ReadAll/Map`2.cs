using AutoFixture;
using FluentAssertions;
using Giveaway.Commons.Extra.Pagination;
using Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Models;
using Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Pagination;
using Giveaway.Web.WebApi.Endpoints.Listings;
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
        var listingMainImage = _fixture.CreateUrl();
        var listingCreatedAt = DateTime.UtcNow;

        var listingDtoModels = new List<ListingDtoModel>
        {
            new() {
                Id = listingId,
                Title = listingTitle,
                Image = listingMainImage,
                CreatedAt = listingCreatedAt,
            }
        };

        var source = listingDtoModels.ToPaginatedList(listPagedQuery, (listPagedQuery) => listPagedQuery);

        var destination = listingDtoModels.Select(l => new ReadAllResponse.Listing
        {
            Id = l.Id,
            Title = l.Title,
            Image = l.Image,
            CreatedAt = l.CreatedAt,
        });

        // Act
        var result = Mapper.Map<ReadAllResponse>(source);

        // Assert
        result.Listings.Result.Should()
            .BeEquivalentTo(destination);
    }
}
