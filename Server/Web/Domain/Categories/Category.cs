using System.ComponentModel;
using System.Runtime.Serialization;
using EnumsNET;
using Giveaway.Commons.Exceptions;

namespace Giveaway.Web.Domain.Categories;

public sealed class Category
{
    private Category() { }
    public int Id { get; init; }

    public string Name { get; init; } = null!;

    public CategoryUrl CategoryUrl { get; init; } = null!;

    public static Category From(int categoryId)
    {
        if (!Enum.IsDefined(typeof(CategoryEnum), categoryId))
            throw new DomainRuleException("Could not parse the given categoryId.");

        var category = (CategoryEnum)categoryId;

        return new Category
        {
            Id = categoryId,
            Name = Enum.GetName(category)!,
            CategoryUrl = new CategoryUrl(category.AsString(EnumFormat.Description)!)
        };
    }

    private enum CategoryEnum
    {
        [EnumMember(Value = "Clothes")]
        [Description("clothes")]
        Clothes = 1,

        [EnumMember(Value = "Toys")]
        [Description("toys")]
        Toys = 2,

        [EnumMember(Value = "Books")]
        [Description("books")]
        Books = 3,

        [EnumMember(Value = "Electronics")]
        [Description("electronics")]
        Electronics = 4
    }
}
