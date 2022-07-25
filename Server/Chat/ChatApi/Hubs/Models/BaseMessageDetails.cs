namespace Giveaway.Chat.ChatApi.Hubs.Models;

public class BaseMessageDetails
{
    public Guid FromUserID { get; set; }

    public string FromUserEmail { get; set; } = null!;

    public string Message { get; set; } = null!;
}
