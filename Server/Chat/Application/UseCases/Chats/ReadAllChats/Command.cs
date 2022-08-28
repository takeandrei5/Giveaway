using Giveaway.Chat.Application.Interfaces;
using Giveaway.Chat.Application.UseCases.Chats.ReadAllChats.Models;
using Giveaway.Chat.Domain.Interfaces;
using Giveaway.Commons.Errors;
using Giveaway.Commons.Interfaces;
using SoftwareCraft.Functional;

namespace Giveaway.Chat.Application.UseCases.Chats.ReadAllChats;

public sealed class Command
{
    private readonly ILoggedUser _currentUserEmailProvider;
    private readonly IMessageReader _messageReader;
    private readonly IUserRepository _userRepository;

    public Command(ILoggedUser currentUserEmailProvider, IMessageReader messageReader, IUserRepository userRepository)
    {
        _currentUserEmailProvider = currentUserEmailProvider;
        _messageReader = messageReader;
        _userRepository = userRepository;
    }

    public async Task<Result<ChatsDtoModel, ForbiddenError>> ExecuteAsync(CancellationToken cancellationToken)
    {
        var userResult =
            await _userRepository.FindUserByEmailAsync(_currentUserEmailProvider.GetEmailFromClaims(), cancellationToken);

        return await userResult.SelectManyAsync(async user =>
        {
            var chats = await _messageReader.ReadChatsByUserEmailAsync(user.Email, cancellationToken);

            return chats.AsSuccess<ChatsDtoModel, ForbiddenError>();
        });
    }
}
