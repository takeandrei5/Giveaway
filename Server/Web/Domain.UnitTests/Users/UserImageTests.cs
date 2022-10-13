using Giveaway.Web.Domain.Users;

namespace Giveaway.Web.Domain.UnitTests.Users;

public sealed class UserImageTests
{
    [Fact(DisplayName = "User image cannot be null.")]
    public void User_Image_Cannot_Be_Null()
    {
        // Arrange & Act
        var act = () => new UserImage("");

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("User image cannot be an empty url.");
    }
    
    [Fact(DisplayName = "User image cannot be an empty url.")]
    public void User_Image_Cannot_Be_An_Empty_Url()
    {
        // Arrange & Act
        var act = () => new UserImage("");

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("User image cannot be an empty url.");
    }

    [Fact(DisplayName = "User image cannot be whitespace.")]
    public void User_Image_Cannot_Be_Whitespace()
    {
        // Arrange & Act
        var act = () => new UserImage("   \r\t");

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("User image cannot be an empty url.");
    }

    [Fact(DisplayName = "User image cannot be an invalid url.")]
    public void User_Image_Cannot_Be_An_Invalid_Url()
    {
        // Arrange & Act
        var act = () => new UserImage("www.google.");

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("User image cannot be an invalid url.");
    }
}
