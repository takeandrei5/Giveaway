using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Domain.Users;
using Giveaway.Domain.Listings;
using System.Runtime.CompilerServices;
using Giveaway.Domain.Categories;

[assembly: InternalsVisibleTo("Giveaway.Application")]

namespace Giveaway.Domain.Users;

public sealed record User
{
    internal User(UserId id, UserInformation information)
    {
        Id = id;
        Information = information;
    }

    public UserId Id { get; init; }

    public UserInformation Information { get; init; }

    public Listing CreateListing(ListingTitle title, ListingDescription description, IEnumerable<ListingImage> images, Category category)
        => new(new(Guid.NewGuid()), title, description, Id, images, category);
}
