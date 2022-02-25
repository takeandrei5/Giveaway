using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Users;

public sealed record User
{
    internal User(UserId userId, UserName userName, UserLocation userLocation)
    {
        UserId = userId;
        UserName = userName;
        UserLocation = userLocation;
    }

    public UserId UserId { get; init; }

    public UserName UserName { get; init; }

    public UserLocation UserLocation { get; init; }
}
