namespace Giveaway.Chat.Domain.UnitTests.Users;

public sealed class UserImageTests
{
    [Fact(DisplayName = "User image cannot be an empty url.")]
    public void User_Image_Cannot_Be_An_Empty_Url()
    {
        var act = () => new UserImage("");

        act.Should()
           .ThrowExactly<ArgumentException>()
           .WithMessage("User image cannot be an empty url.");
    }

    [Fact(DisplayName = "User image cannot be whitespace.")]
    public void User_Image_Cannot_Be_Whitespace()
    {
        var act = () => new UserImage("   \r\t");

        act.Should()
           .ThrowExactly<ArgumentException>()
           .WithMessage("User image cannot be an empty url.");
    }

    [Fact(DisplayName = "User image cannot be an invalid url.")]
    public void User_Image_Cannot_Be_An_Invalid_Url()
    {
        var act = () => new UserImage("www.google.");

        act.Should()
           .ThrowExactly<ArgumentException>()
           .WithMessage("User image cannot be an invalid url.");
    }
}
