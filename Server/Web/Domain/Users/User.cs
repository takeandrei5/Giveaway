using System.Runtime.CompilerServices;
using Giveaway.Web.Domain.Categories;
using Giveaway.Web.Domain.Listings;

[assembly: InternalsVisibleTo("Giveaway.Application")]

namespace Giveaway.Web.Domain.Users;

public sealed record User
{
    internal User(UserId id, UserInformation information)
    {
        Id = id;
        Information = information;
    }

    public UserId Id { get; init; }

    public UserInformation Information { get; init; }

    public Listing CreateListing(ListingTitle title,
        ListingDescription description,
        IEnumerable<ListingImage> images,
        Category category) => new(new ListingId(Guid.NewGuid()), title, description, Id, images, category);
}
