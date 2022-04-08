using AutoFixture;
using Giveaway.Application.Interfaces;
using Giveaway.Application.UseCases.Users.CreateUser;
using Giveaway.Domain.Interfaces;
using Helpers;
using Moq;

namespace Giveaway.Application.UnitTests.UseCases.Users;

public class Base
{
    protected readonly Fixture _fixture;
    protected readonly Mock<ILoggedUser> _loggedUserMock;
    protected readonly Command _sut;
    protected readonly Mock<IUserRepository> _userRepositoryMock;

    protected string Email { get; init; }
    protected string Name { get; init; }
    protected string Image { get; init; }

    public Base()
    {
        _fixture = new();
        _loggedUserMock = new();
        _userRepositoryMock = new();

        _sut = new(_loggedUserMock.Object, _userRepositoryMock.Object);

        Email = _fixture.CreateEmail();
        Name = _fixture.CreateTextWithMaxLength(10);
        Image = _fixture.CreateUrl();
    }
}
