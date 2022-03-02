using Domain.Interfaces;
using Domain.Users;
using SoftwareCraft.Functional;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.DataAccess.UserDbOperations;

public sealed class Repository : IUserRepository
{
    private readonly AppDbContext _dbContext;

    public Repository(AppDbContext dbContext) => _dbContext = dbContext;

    public Task<Result<Maybe<User>, string>> FindUserByEmailAsync(string email)
    {
        throw new NotImplementedException();
        //_dbContext.Users.Where(x => x.Email)
    }
}