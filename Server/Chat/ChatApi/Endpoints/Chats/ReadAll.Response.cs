namespace Giveaway.Chat.ChatApi.Endpoints.Chats;

public sealed record ReadAllResponse
{
    public IEnumerable<Chat> Chats { get; init; } = Enumerable.Empty<Chat>();

    public sealed record Chat
    {
        public string Name { get; init; } = null!;

        public string ImageUrl { get; init; } = null!;
    }
}
