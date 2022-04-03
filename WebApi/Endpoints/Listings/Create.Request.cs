using Giveaway.WebApi.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Giveaway.WebApi.Endpoints.Listings;

public sealed class CreateRequest
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
