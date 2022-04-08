﻿namespace Giveaway.Domain.Listings;

public sealed record ListingDescription
{
    public ListingDescription(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("Listing description cannot be an empty description.");

        if (value is { Length: < 5 })
            throw new ArgumentException("Listing description cannot be shorter than 5 characters.");

        if (value is { Length: > 250 })
            throw new ArgumentException("Listing description cannot be longer than 250 characters.");

        Value = value;
    }

    public string Value { get; init; }
}
