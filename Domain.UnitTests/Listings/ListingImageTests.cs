using FluentAssertions;
using Giveaway.Domain.Listings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Giveaway.Domain.UnitTests.Listings;

public sealed class ListingImageTests
{
    [Fact(DisplayName = "Listing image cannot be an empty url.")]
    public void Listing_Image_Cannot_Be_An_Empty_Url()
    {
        Func<ListingImage> act = () => new("");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Listing image cannot be an empty url.");
    }

    [Fact(DisplayName = "Listing image cannot be whitespace.")]
    public void Listing_Image_Cannot_Be_Whitespace()
    {
        Func<ListingImage> act = () => new("   \r\t");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Listing image cannot be an empty url.");
    }

    [Fact(DisplayName = "Listing image cannot be an invalid url.")]
    public void Listing_Image_Cannot_Be_An_Invalid_Url()
    {
        Func<ListingImage> act = () => new("www.google.");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Listing image cannot be an invalid url.");
    }
}
