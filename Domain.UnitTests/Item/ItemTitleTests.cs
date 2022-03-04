using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Giveaway.Domain.Items;

namespace Giveaway.Domain.UnitTests.Items;

public sealed class ItemTitleTests
{
    [Fact(DisplayName = "Item title cannot be an empty title.")]
    public void Item_Title_Cannot_Be_An_Empty_Title()
    {
        Func<ItemTitle> act = () => new("");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Item title cannot be an empty title.");
    }

    [Fact(DisplayName = "Item title cannot be whitespace.")]
    public void Item_Title_Cannot_Be_Whitespace()
    {
        Func<ItemTitle> act = () => new("   \r\t");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Item title cannot be an empty title.");
    }

    [Fact(DisplayName = "Item title cannot be shorter than 5 characters.")]
    public void Item_Title_Cannot_Be_Shorter_Than_5_Characters()
    {
        Func<ItemTitle> act = () => new(new('A', 4));

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Item title cannot be shorter than 5 characters.");
    }

    [Fact(DisplayName = "Item title cannot be longer than 50 characters.")]
    public void Item_Title_Cannot_Be_Longer_Than_50_Characters()
    {
        Func<ItemTitle> act = () => new(new('A', 51));

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Item title cannot be longer than 50 characters.");
    }
}
