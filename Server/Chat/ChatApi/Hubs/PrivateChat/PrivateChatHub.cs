using Giveaway.Chat.Application.UseCases.Messages.CreateMessage;
using Giveaway.Chat.ChatApi.Hubs.Models;
using Giveaway.Chat.Domain.Messages;
using Giveaway.Chat.Domain.Users;
using Giveaway.Commons.Services;
using Microsoft.AspNetCore.SignalR;

namespace Giveaway.Chat.ChatApi.Hubs.PrivateChat;

public sealed class PrivateChatHub : Hub
{
    private static readonly List<Tuple<string, string>> _connections;
    private readonly Command _command;
    private readonly IHostEnvironment _hostEnvironment;
    private readonly HttpContextLoggedUser _loggedUser;

    static PrivateChatHub() => _connections = new List<Tuple<string, string>>();

    public PrivateChatHub(IServiceProvider serviceProvider)
    {
        _command = serviceProvider.GetRequiredService<Command>();
        _loggedUser = serviceProvider.GetRequiredService<HttpContextLoggedUser>();
        _hostEnvironment = serviceProvider.GetRequiredService<IHostEnvironment>();
    }

    private void ConnectToPrivateChat(string targetEmail)
    {
        var fromUser = new UserEmail(_loggedUser.GetEmailFromClaims());
        var toUser = new UserEmail(targetEmail);

        if (!_connections.Any(connection => connection.Item1 == fromUser.Value && connection.Item2 == toUser.Value))
            _connections.Add(new Tuple<string, string>(fromUser.Value, toUser.Value));
    }

    public async Task SendPrivateMessageAsync(MessageDetails messageDetails)
    {
        ConnectToPrivateChat(messageDetails.ToUser);

        var commandFeed = new CommandFeed
        {
            Message = new Message(messageDetails.Message),
            ToUser = new UserEmail(messageDetails.ToUser)
        };

        var createMessageCommandResult = await _command.ExecuteAsync(commandFeed, CancellationToken.None);

        await createMessageCommandResult.MatchAsync(async () =>
            {
                await Clients.User(messageDetails.ToUser)
                   .SendAsync(Constants.SEND_MESSAGE, messageDetails);
            },
            async error => await Clients.User(_loggedUser.GetEmailFromClaims())
               .SendAsync(Constants.SEND_MESSAGE_FAILED, error));
    }
}
