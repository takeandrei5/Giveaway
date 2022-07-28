using Giveaway.Web.Domain.Categories;
using Giveaway.Web.Domain.Listings;

namespace Giveaway.Web.Application.UseCases.Listings.CreateListing;

public sealed record CommandFeed
{
    public ListingTitle Title { get; init; } = null!;

    public ListingDescription Description { get; init; } = null!;

    public IEnumerable<ListingImage> Images { get; init; } = Enumerable.Empty<ListingImage>();

    public Category Category { get; init; } = null!;
}
