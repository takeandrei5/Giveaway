﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Domain.Users;

public sealed record UserEmail
{
    private static readonly Regex emailRegex = new(@"^([\w\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$",
        RegexOptions.Compiled | RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));

    internal UserEmail(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("User email cannot be an empty email.");

        if (!emailRegex.IsMatch(value))
            throw new ArgumentException("User email cannot be an invalid email.");

        Value = value;
    }

    public string Value { get; init; }
}
