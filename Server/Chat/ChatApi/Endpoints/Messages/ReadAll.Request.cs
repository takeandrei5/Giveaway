using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace Giveaway.Chat.ChatApi.Endpoints.Messages;

public sealed record ReadAllRequest
{
    [FromQuery(Name = "toUser")]
    public string ToUser { get; init; } = null!;
}
