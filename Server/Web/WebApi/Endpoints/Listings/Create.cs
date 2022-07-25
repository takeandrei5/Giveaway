using Ardalis.ApiEndpoints;
using Giveaway.Domain.Categories;
using Giveaway.Domain.Listings;
using Giveaway.Web.Application.UseCases.Listings.CreateListing;
using Microsoft.AspNetCore.Mvc;

namespace Giveaway.Web.WebApi.Endpoints.Listings;

[Route("/api/listings")]
public sealed class Create : EndpointBaseAsync.WithRequest<CreateRequest>.WithActionResult
{
    private readonly Command _command;

    public Create(Command command) => _command = command;

    [HttpPost]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult> HandleAsync([FromBody] CreateRequest request,
        CancellationToken cancellationToken = default)
    {
        var commandResult = await _command.ExecuteAsync(new()
        {
            Title = new(request.Title),
            Description = new(request.Description),
            Images = request.Images.Select(image => new ListingImage(image)),
            Category = Category.From(request.Category)
        }, cancellationToken);

        return commandResult.Match<ActionResult>(
            (listingId) => Created($"/listing/{listingId}", null),
            (error) => Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}