using Giveaway.Chat.Domain.Messages;
using Giveaway.Chat.Domain.Users;

namespace Giveaway.Chat.Domain.Interfaces;

public interface IMessageRepository
{
    Task CreateMessageAsync(UserEmail fromUser, UserEmail toUser, Message message, CancellationToken cancellationToken);
}
