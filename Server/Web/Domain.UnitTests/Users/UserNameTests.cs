using Giveaway.Web.Domain.Users;

namespace Giveaway.Web.Domain.UnitTests.Users;

public sealed class CategoryUrlTests
{
    [Fact(DisplayName = "User name cannot be null.")]
    public void User_Full_Name_Cannot_Be_Null()
    {
        // Arrange & Act
        var act = () => new UserName("");

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("User name cannot be an empty name.");
    }

    [Fact(DisplayName = "User full name cannot be whitespace.")]
    public void User_Full_Name_Cannot_Be_Whitespace()
    {
        // Arrange & Act
        var act = () => new UserName("   \r\t");

        // Assert
        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("User name cannot be an empty name.");
    }
}
