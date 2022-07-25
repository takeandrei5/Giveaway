namespace Giveaway.Chat.ChatApi.Hubs.Models;

public sealed class MessageResult
{
    public bool IsSuccess { get; init; }

    public string? ErrorMesage { get; init; }
}
