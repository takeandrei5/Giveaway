using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Domain.Items;

public sealed record ItemTitle
{
    public ItemTitle(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("Item title cannot be an empty title.");

        if (value.Length < 5)
            throw new ArgumentException("Item title cannot be shorter than 5 characters.");

        if (value.Length > 50)
            throw new ArgumentException("Item title cannot be longer than 50 characters.");

        Value = value;
    }

    public string Value { get; init; }
}
