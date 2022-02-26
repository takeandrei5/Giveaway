using Domain.Listings;
using Domain.Users;
using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

    [Fact(DisplayName = "Listing description cannot be shorter than 25 characters.")]
    public void Listing_Description_Cannot_Be_Shorter_Than_25_Characters()
    {
        Func<ListingDescription> act = () => new(new('A', 24));

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Listing description cannot be shorter than 25 characters.");
    }

    [Fact(DisplayName = "Listing description cannot be longer than 250 characters.")]
    public void Listing_Description_Cannot_Be_Longer_Than_250_Characters()
    {
        Func<ListingDescription> act = () => new(new('A', 251));

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Listing description cannot be longer than 250 characters.");
    }
}
