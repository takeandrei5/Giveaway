using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Items;

public sealed record ItemId
{
    internal ItemId(Guid value)
    {
        if (value == Guid.Empty)
            throw new ArgumentException("Item id cannot be an empty Guid.");

        Value = value;
    }

    public Guid Value { get; init; }
}
