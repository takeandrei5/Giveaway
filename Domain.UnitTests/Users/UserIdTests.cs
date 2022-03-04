using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Giveaway.Domain.Users;

namespace Giveaway.Domain.UnitTests.Users;
public sealed class UserIdTests
{
    [Fact(DisplayName = "User id cannot be an empty Guid.")]
    public void User_Id_Cannot_Be_An_Empty_Guid()
    {
        Func<UserId> act = () => new(Guid.Empty);

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("User id cannot be an empty Guid.");
    }
}
