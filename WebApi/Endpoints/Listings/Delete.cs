using Ardalis.ApiEndpoints;
using Giveaway.Application.UseCases.Listings.DeleteListing;
using Microsoft.AspNetCore.Mvc;

namespace Giveaway.WebApi.Endpoints.Listings;

[Route("/api/listings/{id}")]
public sealed class Delete : EndpointBaseAsync.WithRequest<DeleteRequest>.WithActionResult
{
    private readonly Command _command;

    public Delete(Command command) => _command = command;

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult> HandleAsync([FromRoute] DeleteRequest request,
        CancellationToken cancellationToken = default)
    {
        var commandResult = await _command.ExecuteAsync(new(request.Id), cancellationToken);

        return commandResult.Match<ActionResult>(
            () => NoContent(),
            (error) => Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}