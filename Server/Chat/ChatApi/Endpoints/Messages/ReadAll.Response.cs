namespace Giveaway.Chat.ChatApi.Endpoints.Messages;

public sealed record ReadAllResponse
{
    public IEnumerable<ConversationMessage> Conversation { get; init; } = Enumerable.Empty<ConversationMessage>();

    public sealed record ConversationMessage
    {
        public bool IsMine { get; init; }

        public string Message { get; init; } = null!;

        public DateTime SendDate { get; init; }
    }
}
