using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Giveaway.Domain.Users;

namespace Giveaway.Domain.Interfaces;

public interface IUserRepository
{
    Task<User> FindUserByEmailAsync(string email, CancellationToken cancellationToken);
}
