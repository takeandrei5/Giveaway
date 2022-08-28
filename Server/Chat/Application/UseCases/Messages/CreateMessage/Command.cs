using Giveaway.Chat.Application.Interfaces;
using Giveaway.Chat.Domain.Interfaces;
using Giveaway.Commons.Errors;
using Giveaway.Commons.Interfaces;
using SoftwareCraft.Functional;

namespace Giveaway.Chat.Application.UseCases.Messages.CreateMessage;

public sealed class Command
{
    private readonly ILoggedUser _currentUserEmailProvider;
    private readonly IMessageRepository _messageRepository;
    private readonly IUserRepository _userRepository;

    public Command(ILoggedUser currentUserEmailProvider, IMessageRepository messageRepository, IUserRepository userRepository)
    {
        _currentUserEmailProvider = currentUserEmailProvider;
        _messageRepository = messageRepository;
        _userRepository = userRepository;
    }

    public async Task<Result<ForbiddenError>> ExecuteAsync(CommandFeed feed,
        CancellationToken cancellationToken)
    {
        var fromUserResultTask =
            _userRepository.FindUserByEmailAsync(_currentUserEmailProvider.GetEmailFromClaims(), cancellationToken);

        var toUserResultTask =
            _userRepository.FindUserByEmailAsync(feed.ToUser.Value, cancellationToken);

        return await (await Result.Lifting.LiftAsync(fromUserResultTask, toUserResultTask))
           .SelectSwitchManyAsync(async users =>
            {
                var (fromUserInformation, toUserInformation) = users;

                await _messageRepository.CreateMessageAsync(fromUserInformation.Email,
                    toUserInformation.Email,
                    feed.Message,
                    cancellationToken);

                return Result.Success<ForbiddenError>();
            });
    }
}
