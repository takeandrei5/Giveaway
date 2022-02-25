using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Locations;

public sealed record Latitude
{
    internal Latitude(decimal value)
    {
        if (value is < -90 or > 90)
            throw new ArgumentException("Latitude coordinate must be between -90 and 90.");

        Value = value;
    }

    public decimal Value { get; init; }
}