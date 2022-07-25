using Ardalis.ApiEndpoints;
using Giveaway.Web.Application.UseCases.Users.CreateUser;
using Microsoft.AspNetCore.Mvc;

namespace Giveaway.Web.WebApi.Endpoints.Users;

[Route("/api/users")]
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

        return commandResult.Match<ActionResult>(
            userId => Created($"/users/{userId}", null),
            () => NoContent());
    }
}
