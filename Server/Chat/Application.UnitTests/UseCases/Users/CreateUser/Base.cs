using Giveaway.Chat.Application.UseCases.Users.CreateUser;
using Giveaway.Chat.Domain.Interfaces;
using Giveaway.Commons.Interfaces;
using Helpers;

namespace Giveaway.Chat.Application.UnitTests.UseCases.Users.CreateUser;

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
        Image = _fixture.CreateUrl();
        UserName = _fixture.CreateTextWithMaxLength(10);
    }

    protected string Email { get; }
    protected string Image { get; }
    protected string UserName { get; }
}
