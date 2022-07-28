using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Giveaway.Web.Domain.Users;
using Helpers;
using Moq;
using Xunit;

namespace Giveaway.Web.Database.IntegrationTests.UserDbOperations.RepositoryTests;

public sealed class FindListingById_2 : Base
{
    [Fact(DisplayName = "FindUserByEmail throws ForbiddenError if user could not be found.")]
    public async Task FindUserByEmail_Throws_ForbiddenError_If_User_Could_Not_Be_Found()
    {
        // Arrange
        var users = _fixture.CreateManyUserEntity(2)
            .ToList();

        var user = new User(new(users[0].Id), new(new(users[0].Email), new(users[0].Name), new(users[0].Image)));

        _loggedUserMock.Setup(mock => mock.GetEmailFromClaims())
            .Returns(user.Information.Email.Value);

        await SetupDatabase(users);

        // Act
        var result = await _sut.FindUserByEmailAsync(user.Information.Email.Value, It.IsAny<CancellationToken>());

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.OnSuccess(result => result.Should()
                .BeEquivalentTo(user));
    }
}
