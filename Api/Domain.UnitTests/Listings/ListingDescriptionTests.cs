using FluentAssertions;
using Giveaway.Domain.Listings;
using System;
using Xunit;

namespace Giveaway.Domain.UnitTests.Listings;
public sealed class ListingDescriptionTests
{
    [Fact(DisplayName = "Listing description cannot be an empty description.")]
    public void Listing_Description_Cannot_Be_An_Empty_Name()
    {
        Func<ListingDescription> act = () => new("");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Listing description cannot be an empty description.");
    }

    [Fact(DisplayName = "Listing description cannot be whitespace.")]
    public void Listing_Description_Cannot_Be_Whitespace()
    {
        Func<ListingDescription> act = () => new("   \r\t");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Listing description cannot be an empty description.");
    }

    [Fact(DisplayName = "Listing description cannot be shorter than 5 characters.")]
    public void Listing_Description_Cannot_Be_Shorter_Than_5_Characters()
    {
        Func<ListingDescription> act = () => new(new('A', 4));

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Listing description cannot be shorter than 5 characters.");
    }

    [Fact(DisplayName = "Listing description cannot be longer than 1000 characters.")]
    public void Listing_Description_Cannot_Be_Longer_Than_1000_Characters()
    {
        Func<ListingDescription> act = () => new(new('A', 1001));

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Listing description cannot be longer than 1000 characters.");
    }
}
