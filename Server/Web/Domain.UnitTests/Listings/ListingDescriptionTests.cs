using Giveaway.Web.Domain.Listings;

namespace Giveaway.Web.Domain.UnitTests.Listings;

public sealed class ListingDescriptionTests
{
    [Fact(DisplayName = "Listing description cannot be null.")]
    public void Listing_Description_Cannot_Be_Null()
    {
        // Arrange & Act
        var act = () => new ListingDescription(null);

        // Act
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing description cannot be an empty description.");
    }
    
    [Fact(DisplayName = "Listing description cannot be an empty description.")]
    public void Listing_Description_Cannot_Be_An_Empty_Name()
    {
        // Arrange & Act
        var act = () => new ListingDescription("");

        // Act
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing description cannot be an empty description.");
    }

    [Fact(DisplayName = "Listing description cannot be whitespace.")]
    public void Listing_Description_Cannot_Be_Whitespace()
    {
        // Arrange & Act
        var act = () => new ListingDescription("   \r\t");

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing description cannot be an empty description.");
    }

    [Fact(DisplayName = "Listing description cannot be shorter than 5 characters.")]
    public void Listing_Description_Cannot_Be_Shorter_Than_5_Characters()
    {
        // Arrange & Act
        var act = () => new ListingDescription(new string('A', 4));

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing description cannot be shorter than 5 characters.");
    }

    [Fact(DisplayName = "Listing description cannot be longer than 1000 characters.")]
    public void Listing_Description_Cannot_Be_Longer_Than_1000_Characters()
    {
        // Arrange & Act
        var act = () => new ListingDescription(new string('A', 1001));

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing description cannot be longer than 1000 characters.");
    }
}
