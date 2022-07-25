namespace Giveaway.Chat.Application.UseCases.Messages.ReadAllMessages.Models;

public sealed record ConversationDtoModel
{
    public IEnumerable<ConversationMessage> Messages { get; init; } = Enumerable.Empty<ConversationMessage>();

    public sealed record ConversationMessage
    {
        public bool IsMine { get; init; }
        
        public string Message { get; init; } = null!;
        
        public DateTime SendDate { get; init; }
    }
}
