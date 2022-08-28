﻿using Ardalis.ApiEndpoints;
using AutoMapper;
using Giveaway.Chat.Application.UseCases.Messages.ReadMessagesByTargetEmail;
using Giveaway.Chat.Domain.Users;
using Microsoft.AspNetCore.Mvc;

namespace Giveaway.Chat.ChatApi.Endpoints.Messages;

[Route("/chatapi/messages")]    
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
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult<ReadAllResponse>>
        HandleAsync([FromRoute] ReadAllRequest request, CancellationToken cancellationToken = default)
    {
        var commandResult = await _command.ExecuteAsync(new UserEmail(request.ToUser), cancellationToken);

        return commandResult.Match(result => Ok(_mapper.Map<ReadAllResponse>(result)),
            error => Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}
