using Giveaway.Web.Domain.Listings;

namespace Giveaway.Web.Domain.UnitTests.Listings;

public sealed class ListingDescriptionTests
{
    [Fact(DisplayName = "Listing description cannot be an empty description.")]
    public void Listing_Description_Cannot_Be_An_Empty_Name()
    {
        var act = () => new ListingDescription("");

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing description cannot be an empty description.");
    }

    [Fact(DisplayName = "Listing description cannot be whitespace.")]
    public void Listing_Description_Cannot_Be_Whitespace()
    {
        var act = () => new ListingDescription("   \r\t");

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing description cannot be an empty description.");
    }

    [Fact(DisplayName = "Listing description cannot be shorter than 5 characters.")]
    public void Listing_Description_Cannot_Be_Shorter_Than_5_Characters()
    {
        var act = () => new ListingDescription(new string('A', 4));

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing description cannot be shorter than 5 characters.");
    }

    [Fact(DisplayName = "Listing description cannot be longer than 1000 characters.")]
    public void Listing_Description_Cannot_Be_Longer_Than_1000_Characters()
    {
        var act = () => new ListingDescription(new string('A', 1001));

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing description cannot be longer than 1000 characters.");
    }
}
