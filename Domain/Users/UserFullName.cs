using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Domain.Users;

public sealed record UserFullName
{
    public UserFullName(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("User full name cannot be an empty name.");

        Value = value;
    }

    public string Value { get; init; }
}
