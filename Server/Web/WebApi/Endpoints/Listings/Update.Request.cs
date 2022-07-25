using System.ComponentModel.DataAnnotations;
using Giveaway.Commons.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace Giveaway.Web.WebApi.Endpoints.Listings;

public sealed class UpdateRequest
{
    [FromRoute(Name = "id")]
    [Required]
    [NotEmptyGuid]
    public Guid Id { get; init; }

    [FromBody]
    [Required]
    public UpdateRequestDetails Details { get; init; } = null!;

    public sealed class UpdateRequestDetails
    {
        [Required]
        [MaxLength(50)]
        [MinLength(5)]
        public string Title { get; init; } = null!;

        [Required]
        [MaxLength(1000)]
        [MinLength(5)]
        public string Description { get; init; } = null!;

        [Required]
        [NotEmptyList]
        public IEnumerable<string> Images { get; init; } = null!;

        [Required]
        public int Category { get; init; }
    }
}
