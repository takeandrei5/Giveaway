using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Domain.Items;

public sealed record ItemDescription
{
    public ItemDescription(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("Item description cannot be an empty description.");

        if (value is { Length: < 8 })
            throw new ArgumentException("Item description cannot be shorter than 8 characters.");

        if (value is { Length: > 80 })
            throw new ArgumentException("Item description cannot be longer than 80 characters.");

        Value = value;
    }

    public string Value { get; init; }
}
