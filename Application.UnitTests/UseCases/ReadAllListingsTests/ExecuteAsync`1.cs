using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Giveaway.Application.UnitTests.UseCases.ReadAllListingsTests;

public sealed class ExecuteAsync_1 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow.")]
    public async Task Check_ExecuteAsync_Execution_Flow()
    {
        // Arrange
        Initialize();

        // Act
        await _sut.ExecuteAsync(CancellationToken.None);

        // Assert
        _listingReaderMock.Verify(listingReader => listingReader.ReadAllListings(CancellationToken.None),
            Times.Once);
    }
}
