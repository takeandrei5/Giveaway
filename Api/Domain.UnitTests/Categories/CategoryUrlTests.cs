using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Giveaway.Domain.Categories;

namespace Giveaway.Domain.UnitTests.Categories;

public sealed class CategoryUrlTests
{
    [Fact(DisplayName = "Category url cannot be an empty url.")]
    public void Category_Url_Cannot_Be_An_Empty_Url()
    {
        Func<CategoryUrl> act = () => new("");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Category url cannot be an empty url.");
    }

    [Fact(DisplayName = "Category url cannot be whitespace.")]
    public void Category_Url_Cannot_Be_Whitespace()
    {
        Func<CategoryUrl> act = () => new("   \r\t");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Category url cannot be an empty url.");
    }
}
