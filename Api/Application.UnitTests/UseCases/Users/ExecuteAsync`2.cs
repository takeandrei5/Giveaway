using Giveaway.Domain.Errors;
using Giveaway.Domain.Users;
using Moq;
using SoftwareCraft.Functional;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Giveaway.Application.UnitTests.UseCases.Users;

public sealed class ExecuteAsync_2 : Base
{
    [Fact(DisplayName = "Check ExecuteAsync execution flow if user already exists.")]
    public async Task Check_ExecuteAsync_Execution_Flow_If_User_Already_Exists()
    {
        // Arrange
        _loggedUserMock.Setup(loggedUser => loggedUser.GetEmailFromClaims())
            .Returns(Email);
        _loggedUserMock.Setup(loggedUser => loggedUser.GetNameFromClaims())
            .Returns(Name);
        _loggedUserMock.Setup(loggedUser => loggedUser.GetImageFromClaims())
            .Returns(Image);

        var userInformation = new UserInformation(new(Email), new(Name), new(Image));
        var user = new User(new(Guid.NewGuid()), userInformation);

        _userRepositoryMock.Setup(userRepository => userRepository.FindUserByEmailAsync(
                Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user.AsSuccess<User, ForbiddenError>());

        // Act
        await _sut.ExecuteAsync(CancellationToken.None);

        // Assert
        _loggedUserMock.Verify(loggedUser => loggedUser.GetEmailFromClaims(), Times.Once);
        _loggedUserMock.Verify(loggedUser => loggedUser.GetNameFromClaims(), Times.Once);
        _loggedUserMock.Verify(loggedUser => loggedUser.GetImageFromClaims(), Times.Once);

        _userRepositoryMock.Verify(userRepository => userRepository.FindUserByEmailAsync(
                It.Is<string>(email => Email == email), CancellationToken.None),
            Times.Once);

        _userRepositoryMock.Verify(userRepository => userRepository.CreateAsync(
                It.Is<User>(u => u.Information == userInformation), CancellationToken.None),
            Times.Never);
    }
}
