using Giveaway.WebApi.Attributes;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Giveaway.WebApi.Endpoints.Listings;

public sealed class UpdateRequest
{
    [FromQuery(Name = "id")]
    [Required]
    [NotEmptyGuid]
    public Guid Id { get; init; }

    public UpdateRequestDetails Details { get; init; } = null!;

    public sealed class UpdateRequestDetails
    {
        [Required]
        [MaxLength(50)]
        [MinLength(5)]
        public string Title { get; init; } = null!;

        [Required]
        [MaxLength(250)]
        [MinLength(25)]
        public string Description { get; init; } = null!;

        [Required]
        [NotEmptyList]
        public IEnumerable<string> Images { get; init; } = null!;

        [Required]
        public int Category { get; init; }
    }
}
