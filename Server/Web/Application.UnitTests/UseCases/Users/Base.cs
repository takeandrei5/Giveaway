using AutoFixture;
using Giveaway.Commons.Interfaces;
using Giveaway.Web.Application.UseCases.Users.CreateUser;
using Giveaway.Web.Domain.Interfaces;
using Helpers;
using Moq;

namespace Giveaway.Web.Application.UnitTests.UseCases.Users;

public class Base
{
    protected readonly Fixture _fixture;
    protected readonly Mock<ILoggedUser> _loggedUserMock;
    protected readonly Command _sut;
    protected readonly Mock<IUserRepository> _userRepositoryMock;

    protected Base()
    {
        _fixture = new Fixture();
        _loggedUserMock = new Mock<ILoggedUser>();
        _userRepositoryMock = new Mock<IUserRepository>();

        _sut = new Command(_loggedUserMock.Object, _userRepositoryMock.Object);

        Email = _fixture.CreateEmail();
        Name = _fixture.CreateTextWithMaxLength(10);
        Image = _fixture.CreateUrl();
    }

    protected string Email { get; init; }
    protected string Name { get; init; }
    protected string Image { get; init; }
}
