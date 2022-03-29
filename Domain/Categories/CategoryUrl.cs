﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Domain.Categories;

public sealed record CategoryUrl
{
    internal CategoryUrl(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("Category url cannot be an empty url.");

        Value = value;
    }

    public string Value { get; init; }
}
