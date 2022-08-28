using Giveaway.Chat.Application.UseCases.Users.CreateUser;

namespace Giveaway.Chat.ChatApi.Endpoints.Users;

[Route("/chatapi/users")]
public sealed class Create : EndpointBaseAsync.WithoutRequest.WithActionResult
{
    private readonly Command _command;

    public Create(Command command) => _command = command;

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult> HandleAsync(CancellationToken cancellationToken = default)
    {
        var commandResult = await _command.ExecuteAsync(cancellationToken);

        return commandResult.Match<ActionResult>(userId => Created("", null),
            NoContent);
    }
}
