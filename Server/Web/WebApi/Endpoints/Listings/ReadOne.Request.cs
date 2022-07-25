using System.ComponentModel.DataAnnotations;
using Giveaway.Commons.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace Giveaway.Web.WebApi.Endpoints.Listings;

public sealed record ReadOneRequest
{
    [FromRoute(Name = "id")]
    [Required]
    [NotEmptyGuid]
    public Guid Id { get; init; }
}
