using Giveaway.Web.Domain.Listings;

namespace Giveaway.Web.Domain.UnitTests.Listings;

public sealed class ListingTitleTests
{
    [Fact(DisplayName = "Listing title cannot be an empty title.")]
    public void Listing_Title_Cannot_Be_An_Empty_Title()
    {
        var act = () => new ListingTitle("");

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing title cannot be an empty title.");
    }

    [Fact(DisplayName = "Listing title cannot be whitespace.")]
    public void Listing_Title_Cannot_Be_Whitespace()
    {
        var act = () => new ListingTitle("   \r\t");

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing title cannot be an empty title.");
    }

    [Fact(DisplayName = "Listing title cannot be shorter than 5 characters.")]
    public void Listing_Title_Cannot_Be_Shorter_Than_5_Characters()
    {
        var act = () => new ListingTitle(new string('A', 4));

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing title cannot be shorter than 5 characters.");
    }

    [Fact(DisplayName = "Listing title cannot be longer than 50 characters.")]
    public void Listing_Title_Cannot_Be_Longer_Than_50_Characters()
    {
        var act = () => new ListingTitle(new string('A', 51));

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing title cannot be longer than 50 characters.");
    }
}
