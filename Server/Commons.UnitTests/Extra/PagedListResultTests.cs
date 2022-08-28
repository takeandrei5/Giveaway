using AutoFixture;
using FluentAssertions;
using Giveaway.Commons.Extra.Pagination;
using Xunit;

namespace Commons.UnitTests.Extra;

public class PagedListResultTests
{
    private readonly Fixture _fixture = new();

    [Fact(DisplayName = "PaginatedResult.Empty returns correct values.")]
    public void PaginatedResult_Empty_Returns_Correct_Values()
    {
        // Arrange
        const int expectedCurrentPage = 1;
        const bool expectedHasPreviousPage = false;
        const bool expectedHasNextPage = false;
        const int expectedPageSize = 10;
        const int expectedTotalPages = 1;
        const int expectedTotalCount = 0;

        // Act  
        var result = PaginatedResult<object>.Empty();

        // Assert
        result.Should()
           .Match<PaginatedResult<object>>(paginatedResult =>
                !paginatedResult.Result.Any()
                && paginatedResult.CurrentPage == expectedCurrentPage
                && paginatedResult.HasPreviousPage == expectedHasPreviousPage
                && paginatedResult.HasNextPage == expectedHasNextPage
                && paginatedResult.PageSize == expectedPageSize
                && paginatedResult.TotalPages == expectedTotalPages
                && paginatedResult.TotalCount == expectedTotalCount);
    }

    [Fact(DisplayName = "PaginatedResult.Success returns correct values.")]
    public void PaginatedResult_Success_Returns_Correct_Values()
    {
        // Arrange
        var source = new List<string>();

        for (var i = 0; i < 100; i++)
            source.Add(_fixture.Create<string>());

        const int expectedCurrentPage = 3;
        const bool expectedHasPreviousPage = true;
        const bool expectedHasNextPage = true;
        const int expectedPageSize = 20;
        const int expectedTotalPages = 5;
        const int expectedTotalCount = 100;

        var expectedResult = source.Take(expectedPageSize)
           .ToList();

        // Act  
        var result = PaginatedResult<string>.Success(source.Take(expectedPageSize),
            source.Count,
            expectedCurrentPage,
            expectedPageSize);

        // Assert
        result.Should()
           .Match<PaginatedResult<string>>(paginatedResult =>
                paginatedResult.CurrentPage == expectedCurrentPage
                && paginatedResult.HasPreviousPage == expectedHasPreviousPage
                && paginatedResult.HasNextPage == expectedHasNextPage
                && paginatedResult.PageSize == expectedPageSize
                && paginatedResult.TotalPages == expectedTotalPages
                && paginatedResult.TotalCount == expectedTotalCount)
           .And.Subject.As<PaginatedResult<string>>()
           .Result.Should()
           .BeEquivalentTo(expectedResult);
    }
}
