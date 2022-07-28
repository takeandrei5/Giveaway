using Giveaway.Web.Domain.Categories;
using Giveaway.Web.Domain.Listings;

namespace Giveaway.Web.Application.UseCases.Listings.UpdateListing;

public sealed record CommandFeed
{
    public ListingId Id { get; init; } = null!;

    public ListingTitle Title { get; init; } = null!;

    public ListingDescription Description { get; init; } = null!;

    public IEnumerable<ListingImage> Images { get; init; } = null!;

    public Category Category { get; init; } = null!;
}
