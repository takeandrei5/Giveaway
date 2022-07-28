using Giveaway.Chat.Application.Interfaces;
using Giveaway.Chat.Application.UseCases.Chats.ReadAllChats.Models;
using Giveaway.Commons.Errors;
using Giveaway.Commons.Interfaces;
using SoftwareCraft.Functional;

namespace Giveaway.Chat.Application.UseCases.Chats.ReadAllChats;

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

    public async Task<Result<ChatsDtoModel, ForbiddenError>> ExecuteAsync(CancellationToken cancellationToken)
    {
        var userResult =
            await _userService.FindUserByEmailAsync(_currentUserEmailProvider.GetEmailFromClaims(), cancellationToken);

        return await userResult.SelectManyAsync(async user =>
        {
            var chats = await _messageService.ReadChatsByUserEmailAsync(user.Email, cancellationToken);

            return chats.AsSuccess<ChatsDtoModel, ForbiddenError>();
        });
    }
}
