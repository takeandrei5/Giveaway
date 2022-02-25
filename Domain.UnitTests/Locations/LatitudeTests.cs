using Domain.Locations;
using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Domain.UnitTests.Locations;

public sealed class LatitudeTests
{
    [Fact(DisplayName = "Latitude coordinate value must be at least -90.")]
    public void Latitude_Coordinate_Value_Must_Be_At_Least_Minus_90()
    {
        Func<Latitude> act = () => new Latitude(-91.0m);

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Latitude coordinate must be between -90 and 90.");
    }

    [Fact(DisplayName = "Latitude coordinate value must be at most 90.")]
    public void Latitude_Coordinate_Value_Must_Be_At_Most_90()
    {
        Func<Latitude> act = () => new Latitude(91.0m);

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Latitude coordinate must be between -90 and 90.");
    }
}
