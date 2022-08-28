using Giveaway.Chat.Application.UseCases.Chats.ReadAllChats.Models;
using Giveaway.Chat.Application.UseCases.Messages.ReadMessagesByTargetEmail.Models;
using Giveaway.Chat.Domain.Users;

namespace Giveaway.Chat.Application.Interfaces;

public interface IMessageReader
{
    Task<ConversationDtoModel> ReadConversationByUserEmailAsync(UserEmail targetUserEmail,
        UserEmail currentUserEmail,
        CancellationToken cancellationToken);

    Task<ChatsDtoModel> ReadChatsByUserEmailAsync(UserEmail userEmail,
        CancellationToken cancellationToken);
}
