using Giveaway.Commons.Exceptions;
using Giveaway.Web.Domain.Categories;
using Giveaway.Web.Domain.Users;

namespace Giveaway.Web.Domain.Listings;

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
            throw new DomainRuleException("Images list cannot be an empty list.");

        Images = images;
        Category = category;
    }

    public ListingId Id { get; }

    public ListingTitle Title { get; }

    public ListingDescription Description { get; }

    public UserId OwnerId { get; }

    public IEnumerable<ListingImage> Images { get; }

    public Category Category { get; }
}
