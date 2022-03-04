using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Domain.Users;
using Giveaway.Domain.Listings;

namespace Giveaway.Domain.Users;

public sealed record User
{
    internal User(UserId id, UserName name, UserEmail email)
    {
        Id = id;
        Name = name;
        Email = email;
    }

    public UserId Id { get; init; }

    public UserName Name { get; init; }

    public UserEmail Email { get; init; }

    public Listing CreateListing(ListingTitle title, ListingDescription description)
        => new(new(Guid.NewGuid()), title, description, this);
}
