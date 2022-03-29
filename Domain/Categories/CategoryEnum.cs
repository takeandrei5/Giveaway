using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Domain.Categories;

public enum CategoryEnum
{
    [EnumMember(Value = "Men Clothes")]
    MenClothes,
    [EnumMember(Value = "Women Clothes")]
    WomenClothes,
    [EnumMember(Value = "Kids Clothes")]
    KidsClothes,
    [EnumMember(Value = "Toys")]
    Toys,
    [EnumMember(Value = "Men Footwear")]
    MenFootwear,
    [EnumMember(Value = "Women Footwear")]
    WomenFootwear,
    [EnumMember(Value = "Kids Footwear")]
    KidsFootwear,
}
