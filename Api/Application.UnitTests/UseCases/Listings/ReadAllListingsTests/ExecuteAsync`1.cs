using Giveaway.Application.UseCases.Listings.ReadAllListings.Models;
using Giveaway.Application.UseCases.Listings.ReadAllListings.Pagination;
using Giveaway.Commons.Extra.Pagination;
using Moq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Giveaway.Application.UnitTests.UseCases.Listings.ReadAllListingsTests;

public sealed class ExecuteAsync_1 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow.")]
    public async Task Check_ExecuteAsync_Execution_Flow()
    {
        // Arrange
        var listPagedQuery = new ListPagedQuery
        {
            PageNumber = 1,
            PageSize = 10,
            OrderBy = "Tittle",
            FilterByCategory = null,
        };

        _listingReaderMock.Setup(listingReader => listingReader.ReadAllListingsAsync(
                It.IsAny<ListPagedQuery>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(PaginatedResult<ListingDtoModel>.Empty());

        // Act
        await _sut.ExecuteAsync(listPagedQuery, CancellationToken.None);

        // Assert
        _listingReaderMock.Verify(listingReader => listingReader.ReadAllListingsAsync(listPagedQuery,
                CancellationToken.None),
            Times.Once);
    }
}
