using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Application.UseCases.CreateListing;
using Giveaway.Domain.Items;
using Giveaway.Domain.Listings;

namespace Giveaway.Application.UseCases.CreateListing;

public sealed record CommandFeed
{
    public ListingTitle Title { get; init; } = null!;

    public ListingDescription Description { get; init; } = null!;

    public IEnumerable<Item> Items { get; init; } = Enumerable.Empty<Item>();

    public sealed record Item
    {
        public ItemTitle Title { get; init; } = null!;

        public ItemDescription Description { get; init; } = null!;
    }
}
