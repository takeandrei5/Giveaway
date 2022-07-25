using Giveaway.Commons.Services;
using Microsoft.AspNetCore.SignalR;

namespace Giveaway.Chat.ChatApi.Hubs.PrivateChat;

public sealed class PrivateChatHub : Hub
{
    private readonly IHostEnvironment _hostEnvironment;
    private readonly HttpContextLoggedUser _loggedUser;

    public PrivateChatHub(HttpContextLoggedUser loggedUser, IHostEnvironment hostEnvironment)
    {
        _loggedUser = loggedUser;
        _hostEnvironment = hostEnvironment;
    }

    public async Task SendPrivateMessageAsync(string toUserEmail, string message) => await Clients.User(toUserEmail)
       .SendAsync("ReceiveMessage", message);

    public async Task Send(string toUserEmail) => await Clients.User(toUserEmail)
       .SendAsync("ReceiveMessage", "hello");
}
