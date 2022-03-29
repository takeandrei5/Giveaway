using EnumsNET;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Domain.Categories;

public sealed class Category
{
    public int Id { get; init; }

    public string Name { get; init; } = null!;

    public CategoryUrl CategoryUrl { get; init; } = null!;

    private Category() { }

    public static Category GetCategory(int categoryId)
    {
        if (Enum.TryParse(categoryId.ToString(), out CategoryEnum category))
            throw new ArgumentException("Could not parse the given categoryId.");

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
            _ => throw new NotImplementedException()
        };
    }

    private enum CategoryEnum
    {
        [EnumMember(Value = "Men Clothes"), Description("men-clothes")]
        MenClothes,
        [EnumMember(Value = "Women Clothes"), Description("women-clothes")]
        WomenClothes,
    }
}
