using Giveaway.Chat.Application.Interfaces;
using Giveaway.Chat.Application.UseCases.Messages.ReadMessagesByTargetEmail.Models;
using Giveaway.Chat.Domain.Interfaces;
using Giveaway.Chat.Domain.Users;
using Giveaway.Commons.Errors;
using Giveaway.Commons.Interfaces;
using SoftwareCraft.Functional;

namespace Giveaway.Chat.Application.UseCases.Messages.ReadMessagesByTargetEmail;

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

    public async Task<Result<ConversationDtoModel, ForbiddenError>> ExecuteAsync(UserEmail targetUserEmail,
        CancellationToken cancellationToken)
    {
        var userResult =
            await _userRepository.FindUserByEmailAsync(_currentUserEmailProvider.GetEmailFromClaims(), cancellationToken);

        return await userResult.SelectManyAsync(async user =>
        {
            var conversation = await _messageReader.ReadConversationByUserEmailAsync(targetUserEmail,
                user.Email,
                cancellationToken);

            return conversation.AsSuccess<ConversationDtoModel, ForbiddenError>();
        });
    }
}
