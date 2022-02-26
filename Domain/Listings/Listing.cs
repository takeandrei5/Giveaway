using Domain.Items;
using Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Listings;

public sealed record Listing
{
    internal Listing(ListingId id, ListingTitle title, ListingDescription description, User owner, IEnumerable<Item> items)
    {
        Id = id;
        Title = title;
        Description = description;
        Owner = owner;

        if (items is null || !items.Any())
            throw new ArgumentException("Listing items cannot be an empty list.");

        Items = items;
    }

    public ListingId Id { get; init; }

    public ListingTitle Title { get; init; }

    public ListingDescription Description { get; init; }

    public IEnumerable<Item> Items { get; init; }

    public User Owner { get; init; }
}
