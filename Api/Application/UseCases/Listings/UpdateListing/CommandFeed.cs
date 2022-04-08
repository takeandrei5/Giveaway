using Giveaway.Domain.Categories;
using Giveaway.Domain.Listings;

namespace Giveaway.Application.UseCases.Listings.UpdateListing;

public sealed record CommandFeed
{
    public ListingId Id { get; init; } = null!;

    public ListingTitle Title { get; init; } = null!;

    public ListingDescription Description { get; init; } = null!;

    public IEnumerable<ListingImage> Images { get; init; } = null!;

    public Category Category { get; init; } = null!;
}
