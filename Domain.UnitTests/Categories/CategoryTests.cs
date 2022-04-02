﻿using FluentAssertions;
using Giveaway.Domain.Categories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Giveaway.Domain.UnitTests.Categories;

public sealed class CategoryTests
{
    [Fact(DisplayName = "Category.From throws exception if it cannot parse the given category.")]
    public void CategoryFrom_Throws_Exception_If_It_Cannot_Parse_The_Given_Category()
    {
        Func<Category> act = () => Category.From(int.MaxValue);

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Could not parse the given categoryId.");
    }
}
