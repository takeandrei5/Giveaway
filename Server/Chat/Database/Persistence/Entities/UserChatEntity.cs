namespace Giveaway.Chat.Database.Persistence.Entities;

public sealed record UserChatEntity
{
    public string UserEmail { get; init; } = null!;
    
    public string UserName { get; init; } = null!;
    
    public string UserImage { get; init; } = null!;
    
    public string Message { get; init; } = null!;
    
    public DateTime MessageSendDate { get; init; }
}
