using Giveaway.Web.Domain.Listings;

namespace Giveaway.Web.Domain.UnitTests.Listings;

public sealed class ListingImageTests
{
    [Fact(DisplayName = "Listing image cannot be an empty url.")]
    public void Listing_Image_Cannot_Be_An_Empty_Url()
    {
        var act = () => new ListingImage("");

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing image cannot be an empty url.");
    }

    [Fact(DisplayName = "Listing image cannot be whitespace.")]
    public void Listing_Image_Cannot_Be_Whitespace()
    {
        var act = () => new ListingImage("   \r\t");

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing image cannot be an empty url.");
    }

    [Fact(DisplayName = "Listing image cannot be an invalid url.")]
    public void Listing_Image_Cannot_Be_An_Invalid_Url()
    {
        var act = () => new ListingImage("www.google.");

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing image cannot be an invalid url.");
    }
}
