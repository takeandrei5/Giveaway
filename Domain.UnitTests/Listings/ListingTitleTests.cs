using Domain.Listings;
using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Giveaway.Domain.UnitTests.Listings;

public sealed class ListingTitleTests
{
    [Fact(DisplayName = "Listing title cannot be an empty title.")]
    public void Listing_Title_Cannot_Be_An_Empty_Title()
    {
        Func<ListingTitle> act = () => new("");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Listing title cannot be an empty title.");
    }

    [Fact(DisplayName = "Listing title cannot be whitespace.")]
    public void Listing_Title_Cannot_Be_Whitespace()
    {
        Func<ListingTitle> act = () => new("   \r\t");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Listing title cannot be an empty title.");
    }

    [Fact(DisplayName = "Listing title cannot be shorter than 5 characters.")]
    public void Listing_Title_Cannot_Be_Shorter_Than_5_Characters()
    {
        Func<ListingTitle> act = () => new(new('A', 4));

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Listing title cannot be shorter than 5 characters.");
    }

    [Fact(DisplayName = "Listing title cannot be longer than 50 characters.")]
    public void Listing_Title_Cannot_Be_Longer_Than_50_Characters()
    {
        Func<ListingTitle> act = () => new(new('A', 51));

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Listing title cannot be longer than 50 characters.");
    }
}
