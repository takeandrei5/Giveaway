using Giveaway.WebApi.Attributes;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Giveaway.WebApi.Endpoints.Listings;

public sealed class DeleteRequest
{
    [FromQuery(Name = "id")]
    [Required]
    [NotEmptyGuid]
    public Guid Id { get; init; }
}
