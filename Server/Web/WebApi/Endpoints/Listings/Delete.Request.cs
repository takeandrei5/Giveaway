using System.ComponentModel.DataAnnotations;
using Giveaway.Commons.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace Giveaway.Web.WebApi.Endpoints.Listings;

public sealed class DeleteRequest
{
    [FromRoute(Name = "id")]
    [Required]
    [NotEmptyGuid]
    public Guid Id { get; init; }
}
