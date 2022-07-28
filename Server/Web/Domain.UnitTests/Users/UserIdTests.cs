using System;
using Giveaway.Web.Domain.Users;

namespace Giveaway.Web.Domain.UnitTests.Users;

public sealed class UserIdTests
{
    [Fact(DisplayName = "User id cannot be an empty Guid.")]
    public void User_Id_Cannot_Be_An_Empty_Guid()
    {
        var act = () => new UserId(Guid.Empty);

        act.Should()
           .ThrowExactly<DomainRuleException>()
           .WithMessage("User id cannot be an empty Guid.");
    }
}
