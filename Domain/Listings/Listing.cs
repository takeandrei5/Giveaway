using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Domain.Users;
using Giveaway.Domain.Items;
using Giveaway.Domain.Listings;

namespace Giveaway.Domain.Listings;

public sealed record Listing
{
    internal Listing(ListingId id, ListingTitle title, ListingDescription description, UserId ownerId)
    {
        Id = id;
        Title = title;
        Description = description;
        OwnerId = ownerId;
    }

    public ListingId Id { get; init; }

    public ListingTitle Title { get; init; }

    public ListingDescription Description { get; init; }

    public UserId OwnerId { get; init; }

    public Item CreateItem(ItemTitle title, ItemDescription description)
        => new(new(Guid.NewGuid()), title, Id, description);
}
