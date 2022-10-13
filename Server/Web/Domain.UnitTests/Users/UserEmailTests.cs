using Giveaway.Web.Domain.Users;

namespace Giveaway.Web.Domain.UnitTests.Users;

public sealed class UserEmailTests
{
    [Fact(DisplayName = "User email cannot be null.")]
    public void User_Email_Cannot_Be_Null()
    {
        // Arrange & Act
        var act = () => new UserEmail(null);

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("User email cannot be an empty email.");
    }
    
    [Fact(DisplayName = "User email cannot be an empty email.")]
    public void User_Email_Cannot_Be_An_Empty_Email()
    {
        // Arrange & Act
        var act = () => new UserEmail("");

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("User email cannot be an empty email.");
    }

    [Fact(DisplayName = "User email cannot be whitespace.")]
    public void User_Name_Cannot_Be_Whitespace()
    {
        // Arrange & Act
        var act = () => new UserEmail("   \r\t");

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("User email cannot be an empty email.");
    }

    [Fact(DisplayName = "User email cannot be an invalid email.")]
    public void User_Email_Cannot_Be_An_Invalid_Email()
    {
        // Arrange & Act
        var act = () => new UserEmail("test-test@test");

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("User email cannot be an invalid email.");
    }
}
