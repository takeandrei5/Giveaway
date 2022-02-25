using Domain.Locations;
using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Domain.UnitTests.Locations;

public sealed class LongitudeTests
{
    [Fact(DisplayName = "Longitude coordinate value must be at least -180.")]
    public void Longitude_Coordinate_Value_Must_Be_At_Least_Minus_180()
    {
        Func<Longitude> act = () => new Longitude(-181.0m);

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Longitude coordinate must be between -180 and 180.");
    }

    [Fact(DisplayName = "Longitude coordinate value must be at most 180.")]
    public void Longitude_Coordinate_Value_Must_Be_At_Most_180()
    {
        Func<Longitude> act = () => new Longitude(181.0m);

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Longitude coordinate must be between -180 and 180.");
    }
}
