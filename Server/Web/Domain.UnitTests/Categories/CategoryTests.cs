using Giveaway.Web.Domain.Categories;

namespace Giveaway.Web.Domain.UnitTests.Categories;

public sealed class CategoryTests
{
    [Fact(DisplayName = "Category.From throws exception if it cannot parse the given category.")]
    public void Category_From_Throws_Exception_If_It_Cannot_Parse_The_Given_Category()
    {
        var act = () => Category.From(int.MaxValue);

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Could not parse the given categoryId.");
    }
}
