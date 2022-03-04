using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Domain.Users;

public sealed record UserId
{
    public UserId(Guid value)
    {
        if (value == Guid.Empty)
            throw new ArgumentException("User id cannot be an empty Guid.");

        Value = value;
    }

    public Guid Value { get; init; }
}
