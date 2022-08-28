using Giveaway.Web.Domain.Categories;

namespace Giveaway.Web.Domain.UnitTests.Categories;

public sealed class CategoryTests
{
    [Fact(DisplayName = "Category.From throws exception if it cannot parse the given category.")]
    public void Category_From_Throws_Exception_If_It_Cannot_Parse_The_Given_Category()
    {
        // Arrange & Act
        var act = () => Category.From(int.MaxValue);

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("Could not parse the given categoryId.");
    }

    [Theory(DisplayName = "Category.Id should have correct value.")]
    [InlineData(1, 1)]
    [InlineData(2, 2)]
    [InlineData(3, 3)]
    [InlineData(4, 4)]
    public void Category_Id_Should_Have_Correct_Value(int value, int expected)
    {
        // Act
        var result = Category.From(value);

        // Assert
        result.Id.Should()
           .Be(expected);
    }
    
    [Theory(DisplayName = "Category.Name should have correct value.")]
    [InlineData(1, "Clothes")]
    [InlineData(2, "Toys")]
    [InlineData(3, "Books")]
    [InlineData(4, "Electronics")]
    public void Category_Name_Should_Have_Correct_Value(int value, string expected)
    {
        // Arrange & Act
        var result = Category.From(value);

        // Assert
        result.Name.Should()
           .Be(expected);
    }
    
    [Theory(DisplayName = "Category.CategoryUrl should have correct values if CategoryEnum value is 1.")]
    [InlineData(1, "clothes")]
    [InlineData(2, "toys")]
    [InlineData(3, "books")]
    [InlineData(4, "electronics")]
    public void Category_CategoryUrl_Should_Have_Correct_Value_If_CategoryEnum_Value_Is_1(int value, string expected)
    {
        // Arrange & Act
        var result = Category.From(value);

        // Assert
        result.CategoryUrl.Should()
           .BeEquivalentTo(new CategoryUrl(expected));
    }
}
