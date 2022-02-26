using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Items;

public sealed record Item
{
    internal Item(ItemId id, ItemTitle title, ItemDescription description)
    {
        Id = id;
        Title = title;
        Description = description;
    }

    public ItemId Id { get; init; }

    public ItemTitle Title { get; init; }

    public ItemDescription Description { get; init; }
}
