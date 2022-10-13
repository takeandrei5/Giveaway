using Ardalis.ApiEndpoints;
using AutoMapper;
using Giveaway.Web.Application.UseCases.Listings.ReadAllListings;
using Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Giveaway.Web.WebApi.Endpoints.Listings;

[Route("/api/webapi/listings")]
[AllowAnonymous]
public sealed class ReadAll : EndpointBaseAsync.WithRequest<ReadAllRequest>.WithActionResult<ReadAllResponse>
{
    private readonly Command _command;
    private readonly IMapper _mapper;

    public ReadAll(Command command, IMapper mapper)
    {
        _command = command;
        _mapper = mapper;
    }

    [HttpGet]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult<ReadAllResponse>> HandleAsync([FromRoute] ReadAllRequest request, CancellationToken cancellationToken = default) =>
        Ok(_mapper.Map<ReadAllResponse>(
            await _command.ExecuteAsync(_mapper.Map<ListPagedQuery>(request), cancellationToken)));
}