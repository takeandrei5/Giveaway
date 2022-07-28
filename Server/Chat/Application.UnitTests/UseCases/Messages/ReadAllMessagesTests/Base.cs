using AutoFixture;
using Giveaway.Chat.Application.Interfaces;
using Giveaway.Chat.Application.UseCases.Messages.ReadAllMessages;
using Giveaway.Commons.Interfaces;
using Helpers;

namespace Giveaway.Chat.Application.UnitTests.UseCases.Messages.ReadAllMessagesTests;

public class Base
{
    protected readonly Fixture _fixture;
    protected readonly Mock<ILoggedUser> _loggedUserMock;
    protected readonly Mock<IMessageService> _messageServiceMock;
    protected readonly Command _sut;
    protected readonly Mock<IUserService> _userServiceMock;

    protected Base()
    {
        _fixture = new Fixture();
        _messageServiceMock = new Mock<IMessageService>();
        _loggedUserMock = new Mock<ILoggedUser>();
        _userServiceMock = new Mock<IUserService>();

        _sut = new Command(_loggedUserMock.Object, _messageServiceMock.Object, _userServiceMock.Object);

        Email = _fixture.CreateEmail();
    }

    protected string Email { get; }
}
