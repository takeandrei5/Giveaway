using Giveaway.Chat.Application.UseCases.Messages.ReadAllMessages.Models;
using Giveaway.Chat.Domain.Users;

namespace Giveaway.Chat.Application.Interfaces;

public interface IMessageService
{
    Task<ConversationDtoModel> ReadConversationByUserEmailAsync(UserEmail targetUserEmail,
        UserEmail currentUserEmail, CancellationToken cancellationToken);
}
