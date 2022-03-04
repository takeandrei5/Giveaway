﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Application.UseCases.ReadListing.Models;

namespace Giveaway.Application.UseCases.ReadListing.Models;

public sealed record ListingReadModel
{
    public Guid Id { get; init; }

    public string Name { get; init; } = null!;

    public string Description { get; init; } = null!;

    public IEnumerable<Item> Items { get; init; } = Enumerable.Empty<Item>();

    public sealed record Item
    {
        public Guid Id { get; init; }

        public string Name { get; init; } = null!;

        public string Description { get; init; } = null!;
    }
}
