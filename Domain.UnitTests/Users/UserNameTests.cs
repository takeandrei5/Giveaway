using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Giveaway.Domain.Users;

namespace Giveaway.Domain.UnitTests.Users;
public sealed class UserNameTests
{
    [Fact(DisplayName = "User name cannot be an empty name.")]
    public void User_Full_Name_Cannot_Be_An_Empty_Name()
    {
        Func<UserName> act = () => new("");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("User name cannot be an empty name.");
    }

    [Fact(DisplayName = "User full name cannot be whitespace.")]
    public void User_Full_Name_Cannot_Be_Whitespace()
    {
        Func<UserName> act = () => new("   \r\t");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("User name cannot be an empty name.");
    }
}
