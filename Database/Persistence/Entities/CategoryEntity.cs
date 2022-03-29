using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Database.Persistence.Entities;

public class CategoryEntity
{
    public int Id { get; set; }

    public CategoryEnum Category { get; set; }

    public enum CategoryEnum
    {
        MenClothes,
        WomenClothes,
        KidsClothes,
        Toys,
        MenFootwear,
        WomenFootwear,
        KidsFootwear,
    }
}