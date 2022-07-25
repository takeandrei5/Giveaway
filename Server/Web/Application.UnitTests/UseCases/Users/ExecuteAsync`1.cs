using System;
using System.Threading;
using System.Threading.Tasks;
using Giveaway.Commons.Errors;
using Giveaway.Domain.Users;
using Moq;
using SoftwareCraft.Functional;
using Xunit;

namespace Giveaway.Web.Application.UnitTests.UseCases.Users;

public sealed class ExecuteAsync_1 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow if current user could not be found.")]
    public async Task Check_ExecuteAsync_Execution_Flow_If_Current_User_Could_Not_Be_Found()
    {
        // Arrange
        _loggedUserMock.Setup(loggedUser => loggedUser.GetEmailFromClaims())
            .Returns(Email);
        _loggedUserMock.Setup(loggedUser => loggedUser.GetNameFromClaims())
            .Returns(Name);
        _loggedUserMock.Setup(loggedUser => loggedUser.GetImageFromClaims())
            .Returns(Image);

        _userRepositoryMock.Setup(userRepository => userRepository.FindUserByEmailAsync(
                Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new ForbiddenError($"User onboarding issue for email {Email}").AsError<User, ForbiddenError>());

        var userInformation = new UserInformation(new(Email), new(Name), new(Image));
        var newUser = new User(new(Guid.NewGuid()), userInformation);

        // Act
        await _sut.ExecuteAsync(CancellationToken.None);

        // Assert
        _loggedUserMock.Verify(loggedUser => loggedUser.GetEmailFromClaims(), Times.Once);
        _loggedUserMock.Verify(loggedUser => loggedUser.GetNameFromClaims(), Times.Once);
        _loggedUserMock.Verify(loggedUser => loggedUser.GetImageFromClaims(), Times.Once);

        _userRepositoryMock.Verify(userRepository => userRepository.FindUserByEmailAsync(
                It.Is<string>(email => email == Email), CancellationToken.None),
            Times.Once);

        _userRepositoryMock.Verify(userRepository => userRepository.CreateAsync(
                It.Is<User>(user => user.Information == userInformation), CancellationToken.None),
            Times.Once);
    }
}
