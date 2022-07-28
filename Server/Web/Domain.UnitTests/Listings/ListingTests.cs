using System;
using System.Linq;
using FluentAssertions;
using Giveaway.Web.Domain.Categories;
using Giveaway.Web.Domain.Listings;
using Giveaway.Web.Domain.Users;
using Moq;
using Xunit;

namespace Giveaway.Web.Domain.UnitTests.Listings;

public sealed class ListingTests
{
    [Fact(DisplayName = "Images list cannot be an empty list.")]
    public void Images_list_Cannot_Be_An_Empty_List()
    {
        Func<Listing> act = () => new(It.IsAny<ListingId>(),
            It.IsAny<ListingTitle>(),
            It.IsAny<ListingDescription>(),
            It.IsAny<UserId>(),
            Enumerable.Empty<ListingImage>(),
            It.IsAny<Category>());

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Images list cannot be an empty list.");
    }
}