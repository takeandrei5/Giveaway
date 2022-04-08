using Giveaway.WebApi.Attributes;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Giveaway.WebApi.Endpoints.Listings;

public sealed record ReadOneRequest
{
    [FromRoute(Name = "id")]
    [Required]
    [NotEmptyGuid]
    public Guid Id { get; init; }
}
