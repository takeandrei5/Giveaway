using System;
using Giveaway.Web.Domain.Listings;

namespace Giveaway.Web.Domain.UnitTests.Listings;

public sealed class ListingIdTests
{
    [Fact(DisplayName = "Listing id cannot be an empty Guid.")]
    public void Listing_Id_Cannot_Be_An_Empty_Guid()
    {
        var act = () => new ListingId(Guid.Empty);

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Listing id cannot be an empty Guid.");
    }
}
