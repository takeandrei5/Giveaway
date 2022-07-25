using Giveaway.Chat.ChatApi.Hubs.Models;

namespace Giveaway.Chat.ChatApi.Hubs.PrivateChat;

public sealed class PrivateChatMessageDetails : BaseMessageDetails
{
    public Guid ToUserID { get; set; }

    public string ToUserEmail { get; set; } = null!;
}
