using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Users;

public sealed record UserName
{
    internal UserName(string value)
    {
        if (string.IsNullOrEmpty(value.Trim()))
            throw new ArgumentException("User name cannot be an empty name.");

        if (value.Length > 10)
            throw new ArgumentException("User name cannot be longer than 10 characters.");

        Value = value;
    }

    public string Value { get; init; }
}
