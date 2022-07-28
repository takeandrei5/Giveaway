using System;
using FluentAssertions;
using Giveaway.Web.Domain.Listings;
using Xunit;

namespace Giveaway.Web.Domain.UnitTests.Listings;
public sealed class ListingIdTests
{
    [Fact(DisplayName = "Listing id cannot be an empty Guid.")]
    public void Listing_Id_Cannot_Be_An_Empty_Guid()
    {
        Func<ListingId> act = () => new(Guid.Empty);

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Listing id cannot be an empty Guid.");
    }
}
