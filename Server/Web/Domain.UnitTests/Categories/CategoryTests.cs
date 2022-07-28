using System;
using FluentAssertions;
using Giveaway.Web.Domain.Categories;
using Xunit;

namespace Giveaway.Web.Domain.UnitTests.Categories;

public sealed class CategoryTests
{
    [Fact(DisplayName = "Category.From throws exception if it cannot parse the given category.")]
    public void Category_From_Throws_Exception_If_It_Cannot_Parse_The_Given_Category()
    {
        Func<Category> act = () => Category.From(int.MaxValue);

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Could not parse the given categoryId.");
    }
}
