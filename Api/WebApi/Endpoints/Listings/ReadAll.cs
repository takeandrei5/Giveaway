using Ardalis.ApiEndpoints;
using AutoMapper;
using Giveaway.Application.UseCases.Listings.ReadAllListings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Giveaway.WebApi.Endpoints.Listings;

[Route("/api/listings")]
[AllowAnonymous]
public sealed class ReadAll : EndpointBaseAsync.WithoutRequest.WithActionResult<ReadAllResponse>
{
    private readonly Command _command;
    private readonly IMapper _mapper;

    public ReadAll(Command command, IMapper mapper)
    {
        _command = command;
        _mapper = mapper;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult<ReadAllResponse>> HandleAsync(CancellationToken cancellationToken = default) =>
        Ok(_mapper.Map<ReadAllResponse>(await _command.ExecuteAsync(cancellationToken)));
}