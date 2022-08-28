namespace Giveaway.Chat.ChatApi.Hubs.Models;

public sealed record MessageDetails
{
    public string ToUser { get; set; } = null!;

    public string Message { get; set; } = null!;
}
