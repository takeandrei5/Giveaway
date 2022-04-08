using Giveaway.Domain.Categories;
using Giveaway.Domain.Users;

namespace Giveaway.Domain.Listings;

public sealed record Listing
{
    internal Listing(ListingId id, ListingTitle title, ListingDescription description,
        UserId ownerId, IEnumerable<ListingImage> images, Category category)
    {
        Id = id;
        Title = title;
        Description = description;
        OwnerId = ownerId;

        if (!images.Any())
            throw new ArgumentException("Images list cannot be an empty list.");

        Images = images;
        Category = category;
    }

    public ListingId Id { get; init; }

    public ListingTitle Title { get; init; }

    public ListingDescription Description { get; init; }

    public UserId OwnerId { get; init; }

    public IEnumerable<ListingImage> Images { get; init; }

    public Category Category { get; init; }
}
