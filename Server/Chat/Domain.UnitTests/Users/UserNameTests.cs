namespace Giveaway.Chat.Domain.UnitTests.Users;

public sealed class CategoryUrlTests
{
    [Fact(DisplayName = "User name cannot be an empty name.")]
    public void User_Full_Name_Cannot_Be_An_Empty_Name()
    {
        var act = () => new UserName("");

        act.Should()
           .ThrowExactly<ArgumentException>()
           .WithMessage("User name cannot be an empty name.");
    }

    [Fact(DisplayName = "User full name cannot be whitespace.")]
    public void User_Full_Name_Cannot_Be_Whitespace()
    {
        var act = () => new UserName("   \r\t");

        act.Should()
           .ThrowExactly<ArgumentException>()
           .WithMessage("User name cannot be an empty name.");
    }
}
