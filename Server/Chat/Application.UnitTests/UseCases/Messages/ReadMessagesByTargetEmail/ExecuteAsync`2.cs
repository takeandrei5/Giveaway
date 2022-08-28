using Giveaway.Chat.Application.UseCases.Messages.ReadMessagesByTargetEmail.Models;
using Giveaway.Chat.Domain.Users;
using Giveaway.Commons.Errors;
using Helpers;
using SoftwareCraft.Functional;

namespace Giveaway.Chat.Application.UnitTests.UseCases.Messages.ReadMessagesByTargetEmail;

public sealed class ExecuteAsync_2 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow.")]
    public async Task Check_ExecuteAsync_Execution_Flow()
    {
        // Arrange
        var targetUserEmail = new UserEmail(_fixture.CreateEmail());

        _loggedUserMock.Setup(loggedUser => loggedUser.GetEmailFromClaims())
           .Returns(Email);

        _userRepositoryMock.Setup(userService =>
                userService.FindUserByEmailAsync(Email, It.IsAny<CancellationToken>()))
           .ReturnsAsync(_fixture.CreateUserInformation(Email).AsSuccess<UserInformation, ForbiddenError>());

        _messageReaderMock.Setup(messageService => messageService.ReadConversationByUserEmailAsync(
                It.Is<UserEmail>(userEmail => userEmail.Value == targetUserEmail.Value),
                It.Is<UserEmail>(userEmail => userEmail.Value == Email),
                It.IsAny<CancellationToken>()))
           .ReturnsAsync(new ConversationDtoModel());

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
            Times.Once);
    }
}
