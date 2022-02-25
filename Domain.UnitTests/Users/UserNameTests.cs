using Domain.Users;
using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Giveaway.Domain.UnitTests.Users;
public sealed class UserNameTests
{
    [Fact(DisplayName = "User name cannot be an empty name.")]
    public void User_Name_Cannot_Be_An_Empty_Name()
    {
        Func<UserName> act = () => new("");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("User name cannot be an empty name.");
    }

    [Fact(DisplayName = "User name cannot be whitespace.")]
    public void User_Name_Cannot_Be_Whitespace()
    {
        Func<UserName> act = () => new("     \r\n");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("User name cannot be an empty name.");
    }

    [Fact(DisplayName = "User name cannot be longer than 10 characters.")]
    public void User_Name_Cannot_Be_Longer_Than_10_Characters()
    {
        Func<UserName> act = () => new(new('A', 51));

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("User name cannot be longer than 10 characters.");
    }
}
