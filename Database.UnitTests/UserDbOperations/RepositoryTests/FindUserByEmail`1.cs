using FluentAssertions;
using Giveaway.Domain.Errors;
using Helpers;
using Moq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Giveaway.Database.UnitTests.UserDbOperations.RepositoryTests;

public sealed class FindListingById_1 : Base
{
    [Fact(DisplayName = "FindUserByEmail throws ForbiddenError if user could not be found.")]
    public async Task FindUserByEmail_Throws_ForbiddenError_If_User_Could_Not_Be_Found()
    {
        // Arrange
        var userEmail = _fixture.CreateEmail();

        // Act
        var result = await _sut.FindUserByEmailAsync(userEmail, It.IsAny<CancellationToken>());

        // Assert
        result.Match(
            _ => { },
            error => error.Should()
                .BeEquivalentTo(new ForbiddenError($"User onboarding issue for email {userEmail}")));
    }
}
