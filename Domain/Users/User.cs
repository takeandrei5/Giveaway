using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Items;
using Domain.Listings;

namespace Domain.Users;

public sealed record User
{
    internal User(ListingId userId, UserName userName)
    {
        UserId = userId;
        UserName = userName;
    }

    public ListingId UserId { get; init; }

    public UserName UserName { get; init; }

    public Listing CreateListing(ListingTitle title, ListingDescription description, IEnumerable<Item> items)
        => new(new(Guid.NewGuid()), title, description, items, this);
}
