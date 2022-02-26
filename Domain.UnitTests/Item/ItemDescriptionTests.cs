using Domain.Items;
using Domain.Users;
using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Giveaway.Domain.UnitTests.Items;
public sealed class ItemDescriptionTests
{
    [Fact(DisplayName = "Item description cannot be an empty description.")]
    public void Item_Description_Cannot_Be_An_Empty_Name()
    {
        Func<ItemDescription> act = () => new("");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Item description cannot be an empty description.");
    }

    [Fact(DisplayName = "Item description cannot be whitespace.")]
    public void Item_Description_Cannot_Be_Whitespace()
    {
        Func<ItemDescription> act = () => new("   \r\t");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Item description cannot be an empty description.");
    }

    [Fact(DisplayName = "Item description cannot be shorter than 8 characters.")]
    public void Item_Description_Cannot_Be_Shorter_Than_8_Characters()
    {
        Func<ItemDescription> act = () => new(new('A', 7));

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Item description cannot be shorter than 8 characters.");
    }

    [Fact(DisplayName = "Item description cannot be longer than 80 characters.")]
    public void Item_Description_Cannot_Be_Longer_Than_80_Characters()
    {
        Func<ItemDescription> act = () => new(new('A', 81));

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Item description cannot be longer than 80 characters.");
    }
}
