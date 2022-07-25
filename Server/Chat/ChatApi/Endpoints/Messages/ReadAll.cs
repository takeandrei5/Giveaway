using Ardalis.ApiEndpoints;
using AutoMapper;
using Giveaway.Chat.Application.UseCases.Messages.ReadAllMessages;
using Microsoft.AspNetCore.Mvc;

namespace Giveaway.Chat.ChatApi.Endpoints.Messages;

[Route("/messages")]
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
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult<ReadAllResponse>>
        HandleAsync([FromQuery] ReadAllRequest request, CancellationToken cancellationToken = default)
    {
        var commandResult = await _command.ExecuteAsync(request.Email, cancellationToken);

        return commandResult.Match(result => Ok(_mapper.Map<ReadAllResponse>(result)),
            error => Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}
