namespace Giveaway.Web.Application.UseCases.Listings.ReadAllListings.Models;

public sealed record ListingDtoModel
{
    public Guid Id { get; init; }

    public string Title { get; init; } = null!;

    public string Image { get; init; } = null!;

    public DateTime CreatedAt { get; init; }
}
