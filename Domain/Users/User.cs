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
    internal User(UserId id, UserName name)
    {
        Id = id;
        Name = name;
    }

    public UserId Id { get; init; }

    public UserName Name { get; init; }

    public Listing CreateListing(ListingTitle title, ListingDescription description)
        => new(new(Guid.NewGuid()), title, description, this);
}
