using System;
using FluentAssertions;
using Giveaway.Domain.Users;
using Xunit;

namespace Giveaway.Web.Domain.UnitTests.Users;
public sealed class UserEmailTests
{
    [Fact(DisplayName = "User email cannot be an empty email.")]
    public void User_Email_Cannot_Be_An_Empty_Email()
    {
        Func<UserEmail> act = () => new("");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("User email cannot be an empty email.");
    }

    [Fact(DisplayName = "User email cannot be whitespace.")]
    public void User_Name_Cannot_Be_Whitespace()
    {
        Func<UserEmail> act = () => new("   \r\t");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("User email cannot be an empty email.");
    }

    [Fact(DisplayName = "User email cannot be an invalid email.")]
    public void User_Email_Cannot_Be_An_Invalid_Email()
    {
        Func<UserEmail> act = () => new("test-test@test");

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("User email cannot be an invalid email.");
    }
}
