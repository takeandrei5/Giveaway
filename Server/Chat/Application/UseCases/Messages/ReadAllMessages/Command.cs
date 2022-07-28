using Giveaway.Chat.Application.Interfaces;
using Giveaway.Chat.Application.UseCases.Messages.ReadAllMessages.Models;
using Giveaway.Chat.Domain.Users;
using Giveaway.Commons.Errors;
using Giveaway.Commons.Interfaces;
using SoftwareCraft.Functional;

namespace Giveaway.Chat.Application.UseCases.Messages.ReadAllMessages;

public sealed class Command
{
    private readonly ILoggedUser _currentUserEmailProvider;
    private readonly IMessageService _messageService;
    private readonly IUserService _userService;

    public Command(ILoggedUser currentUserEmailProvider, IMessageService messageService, IUserService userService)
    {
        _currentUserEmailProvider = currentUserEmailProvider;
        _messageService = messageService;
        _userService = userService;
    }

    public async Task<Result<ConversationDtoModel, ForbiddenError>> ExecuteAsync(UserEmail targetUserEmail,
        CancellationToken cancellationToken)
    {
        var userResult =
            await _userService.FindUserByEmailAsync(_currentUserEmailProvider.GetEmailFromClaims(), cancellationToken);

        return await userResult.SelectManyAsync(async user =>
        {
            var conversation = await _messageService.ReadConversationByUserEmailAsync(targetUserEmail,
                user.Email, cancellationToken);

            return conversation.AsSuccess<ConversationDtoModel, ForbiddenError>();
        });
    }
}
