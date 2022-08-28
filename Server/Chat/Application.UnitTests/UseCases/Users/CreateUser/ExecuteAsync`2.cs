using Giveaway.Chat.Domain.Users;
using Giveaway.Commons.Errors;
using SoftwareCraft.Functional;

namespace Giveaway.Chat.Application.UnitTests.UseCases.Users.CreateUser;

public sealed class ExecuteAsync_2 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow if user already exists.")]
    public async Task Check_ExecuteAsync_Execution_Flow_If_User_Already_Exists()
    {
        // Arrange
        _loggedUserMock.Setup(loggedUser =>
                loggedUser.GetEmailFromClaims())
           .Returns(Email);

        _loggedUserMock.Setup(loggedUser =>
                loggedUser.GetNameFromClaims())
           .Returns(UserName);

        _loggedUserMock.Setup(loggedUser =>
                loggedUser.GetImageFromClaims())
           .Returns(Image);

        _userRepositoryMock.Setup(userService =>
                userService.FindUserByEmailAsync(Email, It.IsAny<CancellationToken>()))
           .ReturnsAsync(_fixture.CreateUserInformation(Email).AsSuccess<UserInformation, ForbiddenError>());

        // Act
        await _sut.ExecuteAsync(CancellationToken.None);

        // Assert
        _loggedUserMock.Verify(loggedUser => loggedUser.GetEmailFromClaims(), Times.Once);

        _userRepositoryMock.Verify(userService => userService.FindUserByEmailAsync(Email,
                CancellationToken.None),
            Times.Once);
    }
}
