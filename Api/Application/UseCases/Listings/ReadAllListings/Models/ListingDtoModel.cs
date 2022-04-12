namespace Giveaway.Application.UseCases.Listings.ReadAllListings.Models;

public sealed record ListingDtoModel
{
    public Guid Id { get; init; }

    public string Title { get; init; } = null!;

    public string Description { get; init; } = null!;

    public string MainImageUrl { get; init; } = null!;

    public DateTime CreatedAt { get; init; }
}
