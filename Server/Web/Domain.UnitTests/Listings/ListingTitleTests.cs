using Giveaway.Web.Domain.Listings;

namespace Giveaway.Web.Domain.UnitTests.Listings;

public sealed class ListingTitleTests
{
    [Fact(DisplayName = "Listing title cannot be null.")]
    public void Listing_Title_Cannot_Be_Null()
    {
        // Arrange & Act
        var act = () => new ListingTitle(null);

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing title cannot be an empty title.");
    }
    
    [Fact(DisplayName = "Listing title cannot be an empty title.")]
    public void Listing_Title_Cannot_Be_An_Empty_Title()
    {
        // Arrange & Act
        var act = () => new ListingTitle("");

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing title cannot be an empty title.");
    }

    [Fact(DisplayName = "Listing title cannot be whitespace.")]
    public void Listing_Title_Cannot_Be_Whitespace()
    {
        // Arrange & Act
        var act = () => new ListingTitle("   \r\t");

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing title cannot be an empty title.");
    }

    [Fact(DisplayName = "Listing title cannot be shorter than 5 characters.")]
    public void Listing_Title_Cannot_Be_Shorter_Than_5_Characters()
    {
        // Arrange & Act
        var act = () => new ListingTitle(new string('A', 4));

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing title cannot be shorter than 5 characters.");
    }

    [Fact(DisplayName = "Listing title cannot be longer than 50 characters.")]
    public void Listing_Title_Cannot_Be_Longer_Than_50_Characters()
    {
        // Arrange & Act
        var act = () => new ListingTitle(new string('A', 51));

        // Act
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing title cannot be longer than 50 characters.");
    }
}
