using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Domain.Users;
using Giveaway.Domain.Listings;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("Giveaway.Application")]

namespace Giveaway.Domain.Users;

public sealed record User
{
    internal User(UserId id, UserEmail email)
    {
        Id = id;
        Email = email;
    }

    public UserId Id { get; init; }

    public UserEmail Email { get; init; }

    public Listing CreateListing(ListingTitle title, ListingDescription description)
        => new(new(Guid.NewGuid()), title, description, this.Id);
}
