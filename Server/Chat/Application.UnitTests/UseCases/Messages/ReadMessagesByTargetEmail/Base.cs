using Giveaway.Chat.Application.Interfaces;
using Giveaway.Chat.Application.UseCases.Messages.ReadMessagesByTargetEmail;
using Giveaway.Chat.Domain.Interfaces;
using Giveaway.Commons.Interfaces;
using Helpers;

namespace Giveaway.Chat.Application.UnitTests.UseCases.Messages.ReadMessagesByTargetEmail;

public class Base
{
    protected readonly Fixture _fixture;
    protected readonly Mock<ILoggedUser> _loggedUserMock;
    protected readonly Mock<IMessageReader> _messageReaderMock;
    protected readonly Command _sut;
    protected readonly Mock<IUserRepository> _userRepositoryMock;

    protected Base()
    {
        _fixture = new Fixture();
        _messageReaderMock = new Mock<IMessageReader>();
        _loggedUserMock = new Mock<ILoggedUser>();
        _userRepositoryMock = new Mock<IUserRepository>();

        _sut = new Command(_loggedUserMock.Object, _messageReaderMock.Object, _userRepositoryMock.Object);

        Email = _fixture.CreateEmail();
    }

    protected string Email { get; }
}
