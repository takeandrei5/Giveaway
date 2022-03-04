using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Giveaway.Domain.Items;

namespace Giveaway.Domain.UnitTests.Items;
public sealed class ItemIdTests
{
    [Fact(DisplayName = "Item id cannot be an empty Guid.")]
    public void Item_Id_Cannot_Be_An_Empty_Guid()
    {
        Func<ItemId> act = () => new(Guid.Empty);

        act.Should()
            .ThrowExactly<ArgumentException>()
            .WithMessage("Item id cannot be an empty Guid.");
    }
}
