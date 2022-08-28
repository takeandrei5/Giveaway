using Giveaway.Chat.Domain.Users;
using Giveaway.Commons.Errors;
using SoftwareCraft.Functional;

namespace Giveaway.Chat.Application.UnitTests.UseCases.Users.CreateUser;

public sealed class ExecuteAsync_1 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow if current user could not be found.")]
    public async Task Check_ExecuteAsync_Execution_Flow_If_Current_User_Could_Not_Be_Found()
    {
        // Arrange
        var newUserInformation =
            new UserInformation(new UserEmail(Email), new UserName(UserName), new UserImage(Image));

        _loggedUserMock.Setup(loggedUser =>
                loggedUser.GetEmailFromClaims())
           .Returns(Email);

        _loggedUserMock.Setup(loggedUser =>
                loggedUser.GetNameFromClaims())
           .Returns(UserName);

        _loggedUserMock.Setup(loggedUser =>
                loggedUser.GetImageFromClaims())
           .Returns(Image);

        _userRepositoryMock.Setup(userService => userService.FindUserByEmailAsync(Email, It.IsAny<CancellationToken>()))
           .ReturnsAsync(new ForbiddenError($"User onboarding issue for email {Email}")
               .AsError<UserInformation, ForbiddenError>());

        // Act
        await _sut.ExecuteAsync(CancellationToken.None);

        // Assert
        _loggedUserMock.Verify(loggedUser => loggedUser.GetEmailFromClaims(), Times.Once);

        _userRepositoryMock.Verify(userService => userService.FindUserByEmailAsync(Email,
                CancellationToken.None),
            Times.Once);

        _userRepositoryMock.Verify(userService => userService.CreateUserAsync(It.Is<UserInformation>(userInformation =>
                    userInformation == newUserInformation),
                CancellationToken.None),
            Times.Once);
    }
}
