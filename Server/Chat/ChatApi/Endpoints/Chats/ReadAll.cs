using Giveaway.Chat.Database.DataAccess;
using Microsoft.AspNetCore.Authorization;

namespace Giveaway.Chat.ChatApi.Endpoints.Chats;

[Route("/chats")]
[AllowAnonymous]
public sealed class ReadAll : EndpointBaseAsync.WithoutRequest.WithActionResult<ReadAllResponse>
{
    private readonly MessageService _messageService;

    public ReadAll(MessageService messageService) => _messageService = messageService;

    [HttpGet]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult<ReadAllResponse>> HandleAsync(CancellationToken cancellationToken = default)
    {
        // await _messageService.CreateAsync(new Database.Persistence.Entities.UserEntity
        // {
        //     UserEmail = "userEmail"
        // });
        //
        // var result = await _messageService.GetAsync();

        return Ok();
    }
}
