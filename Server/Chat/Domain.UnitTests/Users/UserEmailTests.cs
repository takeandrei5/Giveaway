namespace Giveaway.Chat.Domain.UnitTests.Users;

public sealed class UserEmailTests
{
    [Fact(DisplayName = "User email cannot be an empty email.")]
    public void User_Email_Cannot_Be_An_Empty_Email()
    {
        var act = () => new UserEmail("");

        act.Should()
           .ThrowExactly<ArgumentException>()
           .WithMessage("User email cannot be an empty email.");
    }

    [Fact(DisplayName = "User email cannot be whitespace.")]
    public void User_Name_Cannot_Be_Whitespace()
    {
        var act = () => new UserEmail("   \r\t");

        act.Should()
           .ThrowExactly<ArgumentException>()
           .WithMessage("User email cannot be an empty email.");
    }

    [Fact(DisplayName = "User email cannot be an invalid email.")]
    public void User_Email_Cannot_Be_An_Invalid_Email()
    {
        var act = () => new UserEmail("test-test@test");

        act.Should()
           .ThrowExactly<ArgumentException>()
           .WithMessage("User email cannot be an invalid email.");
    }
}
