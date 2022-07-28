
using Microsoft.AspNetCore.Authorization;

namespace Giveaway.Chat.ChatApi.Endpoints.Messages;

[Route("/messages")]
[AllowAnonymous]
public sealed class Create : EndpointBaseAsync.WithoutRequest.WithoutResult
{
    // public Create(IMesssageService)
    // {
    //     
    // }
    
    [HttpPost]
    public override Task HandleAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }
}
