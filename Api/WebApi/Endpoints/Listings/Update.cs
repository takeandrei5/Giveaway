using Ardalis.ApiEndpoints;
using Giveaway.Application.UseCases.Listings.UpdateListing;
using Giveaway.Domain.Categories;
using Giveaway.Domain.Listings;
using Microsoft.AspNetCore.Mvc;

namespace Giveaway.WebApi.Endpoints.Listings;

[Route("/api/listings/{id}")]
public sealed class Update : EndpointBaseAsync.WithRequest<UpdateRequest>.WithActionResult
{
    private readonly Command _command;

    public Update(Command command) => _command = command;

    [HttpPut]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult> HandleAsync([FromRoute] UpdateRequest request,
        CancellationToken cancellationToken = default)
    {
        var commandResult = await _command.ExecuteAsync(new()
        {
            Id = new(request.Id),
            Title = new(request.Details.Title),
            Description = new(request.Details.Description),
            Images = request.Details.Images.Select(image => new ListingImage(image)),
            Category = Category.From(request.Details.Category),
        }, cancellationToken);

        return commandResult.Match<ActionResult>(
            () => NoContent(),
            (error) => Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}