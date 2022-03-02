﻿using Domain.Items;
using Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Listings;

public sealed record Listing
{
    internal Listing(ListingId id, ListingTitle title, ListingDescription description, User owner)
    {
        Id = id;
        Title = title;
        Description = description;
        Owner = owner;
    }

    public ListingId Id { get; init; }

    public ListingTitle Title { get; init; }

    public ListingDescription Description { get; init; }

    public User Owner { get; init; }

    public Item CreateItem(ItemTitle title, ItemDescription description)
        => new(new(Guid.NewGuid()), title, Id, description);
}
