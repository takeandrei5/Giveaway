using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace Giveaway.Chat.ChatApi.Endpoints.Messages;

public sealed record ReadAllRequest
{
    [FromQuery(Name = "targetEmail")]
    [Required]
    [EmailAddress]
    public string Email { get; init; } = null!;
}
