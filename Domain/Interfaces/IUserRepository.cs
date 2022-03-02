using Domain.Users;
using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces;

public interface IUserRepository
{
    Task<Result<Maybe<User>, string>> FindUserByEmailAsync(string email);
}
