namespace Giveaway.Chat.ChatApi.Hubs.Models;

public sealed record ConnectionDetails
{
    public string ConnectionId { get; init; } = null!;

    public string UserEmail { get; init; } = null!;
}
