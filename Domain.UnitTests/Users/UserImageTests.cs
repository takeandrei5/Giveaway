using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Giveaway.Domain.Users;

namespace Giveaway.Domain.UnitTests.Users;
public sealed class UserImageTests
{
    [Fact(DisplayName = "User image cannot be an empty url.")]
    public void User_Image_Cannot_Be_An_Empty_Url()
    {
        Func<UserImage> act = () => new("");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("User image cannot be an empty url.");
    }

    [Fact(DisplayName = "User image cannot be whitespace.")]
    public void User_Image_Cannot_Be_Whitespace()
    {
        Func<UserImage> act = () => new("   \r\t");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("User image cannot be an empty url.");
    }

    [Fact(DisplayName = "User image cannot be an invalid url.")]
    public void User_Image_Cannot_Be_An_Invalid_Url()
    {
        Func<UserImage> act = () => new("google.com");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("User image cannot be an invalid url.");
    }
}
