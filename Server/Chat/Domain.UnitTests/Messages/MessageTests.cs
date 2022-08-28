using AutoFixture;
using Giveaway.Chat.Domain.Messages;
using Giveaway.Commons.Exceptions;
using Helpers;

namespace Giveaway.Chat.Domain.UnitTests.Messages;

public sealed class MessageTests
{
    private readonly Fixture _fixture;

    public MessageTests() => _fixture = new Fixture();

    [Fact(DisplayName = "Message cannot be empty.")]
    public void Message_Cannot_Be_Empty()
    {
        var act = () => new Message("");

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Message cannot be empty.");
    }

    [Fact(DisplayName = "Message cannot be whitespace.")]
    public void Message_Cannot_Be_Whitespace()
    {
        var act = () => new Message("\n");

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Message cannot be empty.");
    }

    [Fact(DisplayName = "Message cannot be longer than 255 characters.")]
    public void Message_Cannot_Be_Longer_Than_255_Characters()
    {
        var act = () => new Message(_fixture.CreateTextWithMaxLength(256));

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Message cannot be longer than 255 characters.");
    }
}
