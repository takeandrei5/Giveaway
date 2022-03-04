using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Domain.Listings;

public sealed record ListingDescription
{
    public ListingDescription(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("Listing description cannot be an empty description.");

        if (value is { Length: < 25 })
            throw new ArgumentException("Listing description cannot be shorter than 25 characters.");

        if (value is { Length: > 250 })
            throw new ArgumentException("Listing description cannot be longer than 250 characters.");

        Value = value;
    }

    public string Value { get; init; }
}
