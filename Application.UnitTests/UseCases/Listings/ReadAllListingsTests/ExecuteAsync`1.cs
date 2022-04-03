using Giveaway.Application.UseCases.Listings.ReadAllListings.Models;
using Moq;
using System.Linq;
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
        _listingReaderMock.Setup(listingReader => listingReader.ReadAllListings(It.IsAny<CancellationToken>()))
            .ReturnsAsync(Enumerable.Empty<ListingReadModel>);

        // Act
        await _sut.ExecuteAsync(CancellationToken.None);

        // Assert
        _listingReaderMock.Verify(listingReader => listingReader.ReadAllListings(CancellationToken.None), Times.Once);
    }
}
