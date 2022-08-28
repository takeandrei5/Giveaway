using Giveaway.Chat.Domain.Messages;
using Giveaway.Chat.Domain.Users;

namespace Giveaway.Chat.Application.UseCases.Messages.CreateMessage;

public sealed record CommandFeed
{
    public Message Message { get; init; } = null!;

    public UserEmail ToUser { get; init; } = null!;
}
