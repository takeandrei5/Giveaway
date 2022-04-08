using EnumsNET;
using System.ComponentModel;
using System.Runtime.Serialization;

namespace Giveaway.Domain.Categories;

public sealed class Category
{
    public int Id { get; init; }

    public string Name { get; init; } = null!;

    public CategoryUrl CategoryUrl { get; init; } = null!;

    private Category() { }

    public static Category From(int categoryId)
    {
        if (!Enum.IsDefined(typeof(CategoryEnum), categoryId))
            throw new ArgumentException("Could not parse the given categoryId.");

        var category = (CategoryEnum)categoryId;

        return category switch
        {
            CategoryEnum.MenClothes => new Category()
            {
                Id = categoryId,
                Name = nameof(CategoryEnum.MenClothes),
                CategoryUrl = new(CategoryEnum.MenClothes.AsString(EnumFormat.Description)!)
            },
            CategoryEnum.WomenClothes => new Category()
            {
                Id = categoryId,
                Name = nameof(CategoryEnum.WomenClothes),
                CategoryUrl = new(CategoryEnum.WomenClothes.AsString(EnumFormat.Description)!)
            },
            _ => throw new ArgumentException("Could not parse the given category.")
        };
    }

    private enum CategoryEnum
    {
        [EnumMember(Value = "Men Clothes"), Description("men-clothes")]
        MenClothes = 1,
        [EnumMember(Value = "Women Clothes"), Description("women-clothes")]
        WomenClothes = 2,
    }
}
