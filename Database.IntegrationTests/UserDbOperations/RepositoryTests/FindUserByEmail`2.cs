using FluentAssertions;
using Giveaway.Domain.Users;
using Helpers;
using Moq;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Giveaway.Database.IntegrationTests.UserDbOperations.RepositoryTests;

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
        var userResult = await _sut.FindUserByEmailAsync(user.Information.Email.Value, It.IsAny<CancellationToken>());

        // Assert
        userResult.Match(
            result => result.Should()
                .BeEquivalentTo(user),
            _ => { });
    }
}
