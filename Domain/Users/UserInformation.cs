using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Giveaway.Domain.Users;

public sealed record UserInformation
{
    public UserInformation(UserEmail email, UserFullName fullName, UserImage image)
    {
        Email = email;
        FullName = fullName;
        Image = image;
    }

    public UserEmail Email { get; init; }

    public UserFullName FullName { get; init; }

    public UserImage Image { get; init; }
}
