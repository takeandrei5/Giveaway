using Giveaway.Web.Domain.Categories;

namespace Giveaway.Web.Domain.UnitTests.Categories;

public sealed class CategoryUrlTests
{
    [Fact(DisplayName = "Category url cannot be an empty url.")]
    public void Category_Url_Cannot_Be_An_Empty_Url()
    {
        var act = () => new CategoryUrl("");

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Category url cannot be an empty url.");
    }

    [Fact(DisplayName = "Category url cannot be whitespace.")]
    public void Category_Url_Cannot_Be_Whitespace()
    {
        var act = () => new CategoryUrl("   \r\t");

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Category url cannot be an empty url.");
    }
}
