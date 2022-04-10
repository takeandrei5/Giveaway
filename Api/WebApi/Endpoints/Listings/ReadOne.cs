using Ardalis.ApiEndpoints;
using AutoMapper;
using Giveaway.Application.UseCases.Listings.ReadListingById;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Giveaway.WebApi.Endpoints.Listings;

[Route("/api/listings/{id}")]
[AllowAnonymous]
public sealed class ReadOne : EndpointBaseAsync.WithRequest<ReadOneRequest>.WithActionResult<ReadOneResponse>
{
    private readonly Command _command;
    private readonly IMapper _mapper;

    public ReadOne(Command command, IMapper mapper)
    {
        _command = command;
        _mapper = mapper;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult<ReadOneResponse>> HandleAsync([FromRoute] ReadOneRequest request, CancellationToken cancellationToken = default)
    {
        var commandResult = await _command.ExecuteAsync(new(request.Id), cancellationToken);

        return commandResult.Match(
            result => Ok(_mapper.Map<ReadOneResponse>(result)),
            error => Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}