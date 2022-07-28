namespace Giveaway.Chat.Application.UseCases.Chats.ReadAllChats.Models;

public sealed record ChatsDtoModel
{
    public IEnumerable<Chat> Chats { get; init; } = Enumerable.Empty<Chat>();

    public sealed record Chat
    {
        public string Name { get; init; } = null!;

        public string Email { get; init; } = null!;

        public string Image { get; init; } = null!;
        
        public string LastMessage { get; init; } = null!;
        
        public bool LastMessageMine { get; init; }

        public DateTime LastMessageSendDate { get; init; }
    }
}
