using Giveaway.Web.Domain.Listings;

namespace Giveaway.Web.Domain.UnitTests.Listings;

public sealed class ListingImageTests
{
    [Fact(DisplayName = "Listing image cannot be null.")]
    public void Listing_Image_Cannot_Be_Null()
    {
        // Arrange & Act
        var act = () => new ListingImage(null);

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing image cannot be an empty url.");
    }
    
    [Fact(DisplayName = "Listing image cannot be an empty url.")]
    public void Listing_Image_Cannot_Be_An_Empty_Url()
    {
        // Arrange & Act
        var act = () => new ListingImage("");

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing image cannot be an empty url.");
    }

    [Fact(DisplayName = "Listing image cannot be whitespace.")]
    public void Listing_Image_Cannot_Be_Whitespace()
    {
        // Arrange & Act
        var act = () => new ListingImage("   \r\t");

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing image cannot be an empty url.");
    }

    [Fact(DisplayName = "Listing image cannot be an invalid url.")]
    public void Listing_Image_Cannot_Be_An_Invalid_Url()
    {
        // Arrange & Act
        var act = () => new ListingImage("www.google.");

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing image cannot be an invalid url.");
    }
}
