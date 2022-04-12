using AutoFixture;
using FluentAssertions;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Pagination;
using Giveaway.WebApi.Endpoints.Listings;
using Xunit;

namespace WebApi.UnitTests.Endpoints.Listings.ReadAll;

public sealed class Map_1 : Base
{
    [Fact(DisplayName = "AutoMapper maps ReadAllRequest to ListPagedQuery successfully.")]
    public void AutoMapper_Maps_ReadAllRequest_To_ListPagedQuery_Successfully()
    {
        // Arrange
        var pageNumber = _fixture.Create<int>();
        var pageSize = _fixture.Create<int>();
        var orderBy = _fixture.Create<string>();
        var filterByCategory = _fixture.Create<int?>();

        var source = new ReadAllRequest
        {
            PageNumber = pageNumber,
            PageSize = pageSize,
            OrderBy = orderBy,
            FilterByCategory = filterByCategory
        };

        var destination = new ListPagedQuery()
        {
            PageNumber = pageNumber,
            PageSize = pageSize,
            OrderBy = orderBy,
            FilterByCategory = filterByCategory
        };

        // Act
        var result = Mapper.Map<ListPagedQuery>(source);

        // Assert
        result.Should()
            .BeEquivalentTo(destination);
    }
}
