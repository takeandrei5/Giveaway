namespace Giveaway.Chat.ChatApi.UnitTests.Endpoints.Messages.ReadAll;

public class Base : AutoMapperFixture
{
    private readonly Fixture _fixture;

    protected Base() : base("Giveaway.Chat.ChatApi") => _fixture = new Fixture();

    protected ConversationDtoModel.ConversationMessage CreateConversationMessage() => new()
    {
        Message = _fixture.Create<string>(),
        IsMine = _fixture.Create<bool>(),
        SendDate = _fixture.Create<DateTime>()
    };
}
