using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Domain.Users;
using Giveaway.Domain.Errors;

namespace Giveaway.Domain.Interfaces;

public interface IUserRepository
{
    Task<Result<User, ForbiddenError>> FindUserByEmailAsync(string email, CancellationToken cancellationToken);

    Task CreateAsync(User user, CancellationToken cancellationToken);
}
