namespace Giveaway.Web.Application.UseCases.Listings.ReadListingById.Models;

public sealed record ListingDtoModel
{
    public Guid Id { get; init; }

    public string Title { get; init; } = null!;

    public string Description { get; init; } = null!;

    public int Category { get; init; }

    public DateTime CreatedAt { get; init; }

    public string OwnerImage { get; init; } = null!;

    public string OwnerName { get; init; } = null!;

    public string OwnerEmail { get; init; } = null!;

    public IEnumerable<string> Images { get; init; } = null!;
}
