using Domain.Users;
using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Domain.Listings;

namespace Giveaway.Domain.UnitTests.Listings;
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
