using Giveaway.Chat.Domain.Users;
using Giveaway.Commons.Errors;
using Helpers;
using SoftwareCraft.Functional;

namespace Giveaway.Chat.Application.UnitTests.UseCases.Messages.ReadMessagesByTargetEmail;

public sealed class ExecuteAsync_1 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow if current user could not be found.")]
    public async Task Check_ExecuteAsync_Execution_Flow_If_Current_User_Could_Not_Be_Found()
    {
        // Arrange
        var targetUserEmail = new UserEmail(_fixture.CreateEmail());

        _loggedUserMock.Setup(loggedUser =>
                loggedUser.GetEmailFromClaims())
           .Returns(Email);

        _userRepositoryMock.Setup(userService => userService.FindUserByEmailAsync(Email, It.IsAny<CancellationToken>()))
           .ReturnsAsync(new ForbiddenError($"User onboarding issue for email {Email}")
               .AsError<UserInformation, ForbiddenError>());

        // Act
        await _sut.ExecuteAsync(targetUserEmail, CancellationToken.None);

        // Assert
        _loggedUserMock.Verify(loggedUser => loggedUser.GetEmailFromClaims(), Times.Once);

        _userRepositoryMock.Verify(userService => userService.FindUserByEmailAsync(Email,
                CancellationToken.None),
            Times.Once);

        _messageReaderMock.Verify(messageService =>
                messageService.ReadConversationByUserEmailAsync(
                    It.Is<UserEmail>(userEmail => userEmail.Value == targetUserEmail.Value),
                    It.Is<UserEmail>(userEmail => userEmail.Value == Email),
                    CancellationToken.None),
            Times.Never);
    }
}
