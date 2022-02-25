using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Locations;

public sealed record Longitude
{
    internal Longitude(decimal value)
    {
        if (value is < -180 or > 180)
            throw new ArgumentException("Longitude coordinate must be between -180 and 180.");

        Value = value;
    }

    public decimal Value { get; init; }
}