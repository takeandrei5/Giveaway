using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Giveaway.Commons.Errors;
using Helpers;
using Moq;
using Xunit;

namespace Giveaway.Web.Database.IntegrationTests.UserDbOperations.RepositoryTests;

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
        result.IsSuccess.Should().BeFalse();
        result.OnError(error => error.Should()
                .BeEquivalentTo(new ForbiddenError($"User onboarding issue for email {userEmail}")));
    }
}
